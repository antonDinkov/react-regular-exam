import { useNavigate } from "react-router";

function useDetailsClick() {
    const navigate = useNavigate();

    const handleDetailsClick = (postId) => {
        navigate(`/react-regular-exam/welcome/${postId}/details`, { state: {postId} });
    }
    return {
        handleDetailsClick,
    }
}

export default useDetailsClick;