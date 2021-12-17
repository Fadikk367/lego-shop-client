import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext has not been initialized');
  }

  return authContext;
};

export default useAuth;
