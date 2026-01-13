import { useState } from "react";
import { usersApi } from "../services/usersApi";
import type { User } from "../types/User";

export function useUserById() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const foundUser = await usersApi.getOneUser(userId);
      setUser(foundUser);
    } catch {
      setError("Utilisateur non trouvé");
    } finally {
      setLoading(false);
    }
  };

  return {
    userId,
    setUserId,
    user,
    loading,
    error,
    handleSearch,
  };
}
