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
    });

    const updateForm = (newData) => {
        setFormData((oldData) => ({...oldData, ...newData,}));
    };

    return (
        <FormContext.Provider value={{formData, updateForm}}>
            {children}
        </FormContext.Provider>
    );
};