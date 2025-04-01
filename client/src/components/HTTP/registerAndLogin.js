import { createUserWithEmailAndPassword, db, doc, setDoc, getDoc, getDocs, auth, signInWithEmailAndPassword, addDoc, collection, arrayUnion, increment, updateDoc } from "../../firebase";
import { setUser } from "./localeStorageApi";

export const registerUser = async (contextData) => {
    const { email, password } = contextData;
    try {
        const userdata = await createUserWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        /* console.log(user); */

        await setDoc(doc(db, "users", user.uid), { ...contextData, createdAt: new Date(), userId: user.uid });
    } catch (err) {
        console.error("Error registering user:", err.message);
    }
}

export const loginUser = async (contextData) => {
    const { email, password } = contextData;

    try {
        const userdata = await signInWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        const token = await user.getIdToken();
        const currentUserInfo = await getUser(user.uid);
        setUser(currentUserInfo, token);
        return currentUserInfo;
    } catch (err) {
        console.error("Error login user:", err.message);
    }
}

export const postCreate = async (data) => {
    try {
        const imgUrl = await uploadToCloudinary(data.img);
        if (!imgUrl) {
            data.img = '';
        } else {
            data.img = imgUrl;
        }
        const post = await addDoc(collection(db, "posts"), data);
        const postWithId = { ...data, id: post.id };
        await setDoc(doc(db, "posts", post.id), postWithId);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}

export const postComment = async (postId, data) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            comments: arrayUnion({ data }),
            "feedback.comments": increment(1)
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
}

export const postLike = async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            "feedback.likes": increment(1)
        });
    } catch (error) {
        console.error("Error adding like: ", error);
    }
}

export const postView = async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            "feedback.views": increment(1)
        });
    } catch (error) {
        console.error("Error adding like: ", error);
    }
}

export const getPostById = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            return postSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
};

export const getAllPosts = async () => {
    try {
        const postsCollection = collection(db, "posts");
        const querySnapShot = await getDocs(postsCollection);
        const postsArray = querySnapShot.docs.map((doc) => doc.data());
        postsArray.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
        return postsArray
    } catch (error) {
        console.error("Грешка при взимане на постовете:", error);
    }
};

async function getUser(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error('no such user!');
        }
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
}

const uploadToCloudinary = async (file) => {
    if (!file) { return };
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset");

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dsqegonee/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        if (data.secure_url) {
            console.log("Изображението е качено успешно:", data.secure_url);
            return data.secure_url;
        } else {
            console.error("Грешка при качването на изображението", data);
        }
    } catch (error) {
        console.error("Грешка при качването на изображението:", error);
    }
}