import { useState, useEffect } from "react";
import type { User } from "../types/User";
import { usersApi } from "../services/usersApi";

export interface UserFormState extends Omit<User, "id"> {}

export function useUserForm(user?: User, onSuccess?: () => void) {
  const [form, setForm] = useState<UserFormState>({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname,
        lastname: user.lastname,
      });
    } else {
      setForm({
        firstname: "",
        lastname: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (user) {
        const rest = { firstname: form.firstname, lastname: form.lastname };
        await usersApi.updateUser(user.id, rest);
      } else {
        await usersApi.createUser({
          firstname: form.firstname,
          lastname: form.lastname,
        });
      }
      if (onSuccess) onSuccess();
    } catch {
      setError("Erreur lors de l'enregistrement de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
