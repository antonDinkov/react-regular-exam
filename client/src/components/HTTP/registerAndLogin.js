import { createUserWithEmailAndPassword, db, doc, setDoc, getDoc, getDocs, deleteDoc, auth, signInWithEmailAndPassword, addDoc, collection, arrayUnion, increment, updateDoc, query, where } from "../../firebase";
import { setUser } from "./localeStorageApi";

export const registerUser = async (contextData) => {
    const { email, password } = contextData;
    try {
        const userdata = await createUserWithEmailAndPassword(auth, email, password);
        const user = userdata.user;

        await setDoc(doc(db, "users", user.uid), { ...contextData, createdAt: new Date(), userId: user.uid });
        const token = await user.getIdToken();
        const currentUserInfo = await getUser(user.uid);
        setUser(currentUserInfo, token);
        return currentUserInfo;
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
        const preset = "my_unsigned_preset"
        const imgInfo = await uploadToCloudinary(data.img, preset);
        if (!imgInfo) {
            data.img = '';
            data.imgId = '';
        } else {
            data.img = imgInfo.url;
            data.imgId = imgInfo.id;
        }
        const post = await addDoc(collection(db, "posts"), data);
        const postWithId = { ...data, id: post.id };
        await setDoc(doc(db, "posts", post.id), postWithId);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}

export const deletePost = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        await deleteDoc(postRef);
        console.log("Post deleted successfully!");
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

export const upDatePost = async (postId, newImage, content, oldUrl, oldImgId) => {
    let imgInfo = '';
    const preset = 'my_unsigned_preset';
    if (newImage) {
        imgInfo = await uploadToCloudinary(newImage, preset);
    }

    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            content,
            img: imgInfo.url ? imgInfo.url : oldUrl,
            imgId: imgInfo.id ? imgInfo.id : oldImgId
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
}

export const upDateUserInfo = async (userName, userId, content, profileImg, wallImg) => {
    console.log(userName);
    console.log(userId);
    
    
    let imgInfoProfi = '';
    const presetProfi = 'profile_upload';
    const presetWall = 'wall_upload';
    if (profileImg) {
        imgInfoProfi = await uploadToCloudinary(profileImg, presetProfi);
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("meta.author", "==", userName));
        const querySnapshot = await getDocs(q);

        const updatePromises = querySnapshot.docs.map(async (postDoc) => {
            const postRef = doc(db, "posts", postDoc.id);
            await updateDoc(postRef, {
                "meta.profileImg": imgInfoProfi.url
            });
        });

        await Promise.all(updatePromises);

    }
    let imgInfoWall = '';
    if (wallImg) {
        imgInfoWall = await uploadToCloudinary(wallImg, presetWall);
    }

    const postRef = doc(db, "users", userId);
    try {
        await updateDoc(postRef, {
            ...content,
            updatesHistory: arrayUnion(new Date().toLocaleString()),
            profileImg: imgInfoProfi.url ? imgInfoProfi.url : '',
            profileImgID: imgInfoProfi.id ? imgInfoProfi.id : '',
            wallImg: imgInfoWall.url ? imgInfoWall.url : '',
            wallImgId: imgInfoWall.id ? imgInfoWall.id : '',
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
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

export const removeImg = async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            img: '',
            imgId: ''
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
}

export const postLike = async (postId, name) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            "feedback.likes": increment(1),
            "feedback.likedPeople": arrayUnion(name)
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
        const filteredArray = (name) => {
            return postsArray.filter((post) => post.meta.author === name);
        }
        return { postsArray, filteredArray };
    } catch (error) {
        console.error("Error loading posts", error);
    }
};

export async function getUser(userId) {
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

const uploadToCloudinary = async (file, uploadPreset) => {
    if (!file) { return };
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

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
            return {
                url: data.secure_url,
                id: data.public_id
            };
        } else {
            console.error("Error uploading your media: ", data);
        }
    } catch (error) {
        console.error("Error uploading your media: ", error);
    }
}

const deleteImage = async (publicId) => {
    if (!publicId) return;
    const cloudName = "dsqegonee";
    const apiKey = "296126373257215";
    const apiSecret = "msuSspZaijhdnN0podqRAvgpyVo";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/destroy/${publicId}`;

    const headers = {
        "Authorization": "Basic " + btoa(`${apiKey}:${apiSecret}`),  // Базова автентикация
        "Content-Type": "application/json"
    };

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error deleting image:", error);
        return null;
    }
};

export async function getUserId(userName) {
    const postsRef = collection(db, "users");
        const q = query(postsRef, where("name", "==", userName));
        const querySnapshot = await getDocs(q);

        const userDoc = querySnapshot.docs.find(doc => doc.data().name === userName);
        if (userDoc) {
            return userDoc.id; 
        } else {
            alert ('Somthing went wrong! Please report the mistake!');
            return null;
        }
}