import { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({data: { session }}) => {
        setSession(session);
        setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;