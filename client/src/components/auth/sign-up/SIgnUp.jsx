import { useState } from 'react';

import { SignUpUser } from '../../../services/authService/SignUpUser.js';

import SignUpDesign from "./SignUpDesign";

const SignUp = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await SignUpUser(formData);
    }

    return (
        <>
            <SignUpDesign formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </>
    )
}

export default SignUp