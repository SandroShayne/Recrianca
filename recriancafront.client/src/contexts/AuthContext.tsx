import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser } from "../interfaces/IUser";
import { authService } from "../services/auth.service";
import { storage } from "../utils/storage";

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = storage.getToken();

      if (storedToken) {
        try {
          const decodedToken = jwtDecode<IUser>(storedToken);
          setUser(decodedToken);
        } catch (error) {
          console.error("Invalid token:", error);
          storage.removeToken();
        }
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login({
      email: email,
      senha: password,
    });
    setUser(user);
    storage.setToken(token);
  };

  const logout = () => {
    authService.logout();
    storage.removeToken();
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      signed: !!user,
      user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
