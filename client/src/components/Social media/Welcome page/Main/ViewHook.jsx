import { postView } from "../../../HTTP/registerAndLogin";

function useViewHandle() {

    const handleView = async (postId) => {
        try {
            await postView(postId);
        } catch (error) {
            alert("Error adding like: " + error.message);
        }
    };

    return { handleView };
}

export default useViewHandle;