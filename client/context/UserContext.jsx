import { createContext, useState } from "react";

export const FormContext = createContext({
    name: '',
    email: '',
    birthday: {
        month: '',
        day: '',
        year: '',
    },
});

export function FormDataProvider ({children}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthday: {
            month: '',
            day: '',
            year: '',
        },
    });

    const updateForm = (newData) => {
        setFormData((oldData) => ({...oldData, newData,}));
    };

    return (
        <FormContext.Provider value={{...formData, updateForm}}>
            {children}
        </FormContext.Provider>
    );
};