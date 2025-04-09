import { createContext, useState } from "react";

export const FormContext = createContext();

export function FormDataProvider ({children}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthday: {
            month: '',
            day: '',
            year: '',
        },
        checkbox: {
            getMore: '',
            connectWith: '',
            peronalizedAds: '',
            noThanks: '',
        },
        bio: '',
        updateHistory: [],
        profileImg: '',
        profileImgID: '',
        wallImg: '',
        wallImgId: '',
    });

    const updateForm = (newData) => {
        setFormData((oldData) => ({...oldData, ...newData,}));
    };

    const resetFormData = () => {
        setFormData ({
            name: '',
            email: '',
            password: '',
            birthday: {
                month: '',
                day: '',
                year: '',
            },
            checkbox: {
                getMore: '',
                connectWith: '',
                peronalizedAds: '',
                noThanks: '',
            },
        });
    }

    return (
        <FormContext.Provider value={{formData, updateForm, resetFormData}}>
            {children}
        </FormContext.Provider>
    );
};