import { useContext } from 'react';
import { AuthContext } from '../components/Auth/AuthContext/AuthContext';

export const useAuth = () => useContext(AuthContext);