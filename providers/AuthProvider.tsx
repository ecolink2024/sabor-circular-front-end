import { fetchUserData } from "@/lib/actions/actions";
import { AuthContextType, User } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  // State to store the token
  const [token, setToken] = useState<string | null>(null);

  // State to store user data
  const [user, setUser] = useState<User | null>(null);

  // State to manage loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Flag to detect if logout was triggered
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  // Effect to load user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoading(true);
        try {
          const fetchedUser = await fetchUserData({ userToken: storedToken });
          setUser(fetchedUser);
        } catch (error: any) {
          if (error.message === "Unauthorized") {
            logout();
          } else {
            console.error("Error fetching user data:", error);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to refetch user data
  const refetchUserData = useCallback(async () => {
    if (!token) {
      console.error("No hay token disponible para refetch.");
      return;
    }

    setIsLoading(true);
    try {
      const fetchedUser = await fetchUserData({ userToken: token });
      setUser(fetchedUser);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        console.error("Error al refetch user data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Function to log in
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoading(true);
    fetchUserData({ userToken: token })
      .then(setUser)
      .catch((error) => {
        console.error("Error fetching user data during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Function to log out
  const logout = () => {
    setIsLoggingOut(true);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        refetchUserData,
        isLoading,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
