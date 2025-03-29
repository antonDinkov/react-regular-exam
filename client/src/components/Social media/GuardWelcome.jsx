import { Navigate, useNavigate } from "react-router";
import { getUserToken } from "../HTTP/localeStorageApi";
import { useEffect } from "react";

function GuardWelcome({children}) {
    const userAccessToken = getUserToken();
    const navigate = useNavigate()
    
    useEffect( () => {
        if (!userAccessToken) {
            return navigate('/react-regular-exam');
        }
    }
        
    )
    

    return (
        <>
            {children}
        </>
    )
};

export default GuardWelcome;