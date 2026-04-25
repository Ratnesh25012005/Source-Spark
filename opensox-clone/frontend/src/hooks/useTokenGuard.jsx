import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function useTokenGuard() {
  const { token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const verify = async () => {
      const currentToken = localStorage.getItem('token') || token;
      if (!currentToken) {
        logout();
        navigate('/signin', { replace: true });
        return;
      }

      try {
        await api.get('/auth/me');
      } catch (error) {
        if (!active) {
          return;
        }

        if (error?.response?.status === 401 || !error?.response) {
          logout();
          navigate('/signin', { replace: true });
        }
      }
    };

    verify();

    return () => {
      active = false;
    };
  }, [location.pathname, navigate, logout, token]);
}

export default useTokenGuard;
