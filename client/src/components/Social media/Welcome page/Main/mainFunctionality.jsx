import { useEffect, useState } from "react";
import { collection, db, getDocs } from "../../../../firebase";

function useMainFunctionality (postsPerPage = 6) {
    /* const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); */
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    

    const handleSearch = (searchValue, setFilteredPosts, posts) => {
        const searchText = searchValue.trim().toLowerCase();

        if (searchText === "") {
            setPage(1)
            setFilteredPosts(posts.slice(0, page * postsPerPage));
        } else {
            const results = posts.filter((post) =>
                post.content?.toLowerCase().includes(searchText)
            );
            setFilteredPosts(results);
        }
    };

    
        const fetchPosts = async (setPosts, setFilteredPosts) => {
            try {
                const postsCollection = collection(db, "posts");
                const querySnapShot = await getDocs(postsCollection);
                const postsArray = querySnapShot.docs.map((doc) => doc.data());
                postsArray.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
                setPosts(postsArray);
                setFilteredPosts(postsArray.slice(0, postsPerPage));
            } catch (error) {
                console.error("Грешка при взимане на постовете:", error);
            }
        };
    

    const loadMorePosts = (posts, filteredPosts, setFilteredPosts) => {
        if (loading || filteredPosts.length >= posts.length) return;
        setLoading(true);
        const nextPage = page + 1;
        const newPosts = posts.slice(page * postsPerPage, nextPage * postsPerPage);

        if (newPosts.length > 0) {
            setFilteredPosts([...filteredPosts, ...newPosts]/* prevPosts => [...prevPosts, ...newPosts] */);
            setPage(nextPage);
        }

        setLoading(false);
    };

    return { fetchPosts, loadMorePosts, loading, handleSearch };
};

export default useMainFunctionality;