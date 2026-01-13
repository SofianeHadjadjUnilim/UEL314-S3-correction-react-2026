import { useState, useEffect, useCallback } from "react";
import { type User } from "../types/User";
import { usersApi } from "../services/usersApi";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.getAllUsers();
      setUsers(data);
    } catch {
      setError("Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  }, []);

  const getOneUser = useCallback(async (id: string) => {
    try {
      const user = await usersApi.getOneUser(id);
      return user;
    } catch {
      setError("Erreur lors du chargement de l'utilisateur");
    }
  }, []);

  const updateUser = useCallback(
    async (id: string, userData: Partial<User>) => {
      try {
        await usersApi.updateUser(id, userData);
        loadUsers(); // Recharger la liste
      } catch {
        setError("Erreur lors de la mise à jour");
      }
    },
    [loadUsers]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        return;
      }
      try {
        await usersApi.deleteUser(id);
        loadUsers(); // Recharger la liste
      } catch {
        setError("Erreur lors de la suppression");
      }
    },
    [loadUsers]
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    updateUser,
    deleteUser,
    getOneUser,
  };
}
