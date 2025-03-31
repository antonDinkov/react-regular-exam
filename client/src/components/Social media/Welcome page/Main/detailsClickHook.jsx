import { useNavigate } from "react-router";

function useDetailsClick() {
    const navigate = useNavigate();

    const handleDetailsClick = (post) => {
        navigate(`/react-regular-exam/welcome/${post.id}/details`, { state: {post} });
    }
    return {
        handleDetailsClick,
    }
}

export default useDetailsClick;