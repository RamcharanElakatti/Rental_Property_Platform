import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../services/api.js';
import { demoUsers } from '../data/demoData.js';

const AuthContext = createContext(null);
const demoMode = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'false';

const storedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('prm_user'));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem('prm_token'));

  const persist = (authResponse) => {
    localStorage.setItem('prm_token', authResponse.token);
    localStorage.setItem('prm_user', JSON.stringify(authResponse.user));
    setToken(authResponse.token);
    setUser(authResponse.user);
  };

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      persist(response);
      return response.user;
    } catch (error) {
      if (!demoMode) throw error;
      const demoUser = demoUsers.find((candidate) => candidate.email.toLowerCase() === credentials.email.toLowerCase());
      if (!demoUser) throw error;
      persist({ token: `demo-token-${demoUser.id}`, user: demoUser });
      return demoUser;
    }
  };

  const register = async (payload) => {
    try {
      const response = await authApi.register(payload);
      persist(response);
      return response.user;
    } catch (error) {
      if (!demoMode) throw error;
      const role = payload.role.startsWith('ROLE_') ? payload.role : `ROLE_${payload.role.toUpperCase()}`;
      const demoUser = {
        id: Date.now(),
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        avatarUrl: '',
        enabled: true,
        roles: [role],
        createdAt: new Date().toISOString()
      };
      persist({ token: `demo-token-${demoUser.id}`, user: demoUser });
      return demoUser;
    }
  };

  const updateCurrentUser = (nextUser) => {
    localStorage.setItem('prm_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('prm_token');
    localStorage.removeItem('prm_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
    updateCurrentUser,
    hasRole: (role) => user?.roles?.includes(role)
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
