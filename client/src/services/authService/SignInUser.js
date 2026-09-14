import { supabase } from '../../config/supabaseClient.js';

export const SignInUser = async ({email, password}) => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        console.log('Login error:', error.message);
        return {error};
    }

    return { data };
}