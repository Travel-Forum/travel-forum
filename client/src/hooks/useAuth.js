import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Reads the auth state from AuthProvider.
 * @returns {{ session: object | null, user: object | null, loading: boolean, signOut: () => Promise<void> }}
 */
export const useAuth = () => useContext(AuthContext);
