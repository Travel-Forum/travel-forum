import { supabase } from '../../config/supabaseClient.js';
import { appUrl } from '../../config/environments.js';

export const SignUpUser = async ({email, password}) => {
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${appUrl}/auth/callback`,
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