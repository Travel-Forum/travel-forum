import { supabase } from '../../config/supabaseClient.js';

export const SignUpUser = async ({firstName, lastName, username, email, phone, password}) => {
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'http://localhost:5173/auth/callback',
            data: {
                first_name: firstName,
                last_name: lastName,
                username: username,
                phone: phone,
            },
        },
    })

    if (error) {
        return {error};
    }

    if (data.user?.identities?.length === 0) {
        return {error: { message: 'Account with this email already exists.' }};
    } 

    return { data };
}