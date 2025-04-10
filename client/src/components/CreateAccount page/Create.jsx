import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { FormContext } from '../../../context/UserContext';
import CreateJSX from './CreateJSX';

function Create() {
    const { updateForm } = useContext(FormContext);
    const navigate = useNavigate();

    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.elements.name?.value || '',
            email: e.target.elements.email?.value || '',
            password: e.target.elements.password?.value || '',
            birthday: {
                month: e.target.elements.month?.value || '',
                day: e.target.elements.day?.value || '',
                year: e.target.elements.year?.value || '',
            }
        };

        if (!formData.name) {
            return alert('You must enter a name!');
        }

        if (!formData.email || !emailRegEx.test(formData.email)) {
            return alert('You must enter a valid email address!');
        }

        if (!formData.password || formData.password.length < 6 || !passwordRegEx.test(formData.password)) {
            return alert('Your password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character!');
        }

        if (formData.password !== e.target.elements.repeat?.value) {
            return alert('Password Missmatch!');
        }

        if (!formData.birthday.month) {
            return alert('You must choose a month!');
        } else if (!formData.birthday.day) {
            return alert('You must choose a day!');
        } else if (!formData.birthday.year) {
            return alert('You must choose an year!');
        }

        await updateForm(formData);

        navigate('/react-regular-exam/create/submit');
    };

    const handlePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    };

    const handleRepeatVisibility = () => {
        const passwordInput = document.getElementById("repeat");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    };

    return (
        <CreateJSX submit={handleSubmit} clickPass={handlePasswordVisibility} clickRep={handleRepeatVisibility} />
    );
}

export default Create;