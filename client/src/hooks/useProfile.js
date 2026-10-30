import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

/**
 * Reads the signed-in user's profile from ProfileProvider. It updates in real
 * time, so `isBlocked` changes as soon as an admin blocks or unblocks the user.
 * @returns {{ profile: object | null, isBlocked: boolean, loading: boolean, error: Error | null, refreshProfile: () => Promise<void> }}
 */
export const useProfile = () => useContext(ProfileContext);
