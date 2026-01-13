import { useState, useEffect } from "react";
import type { User } from "../types/User";
import { usersApi } from "../services/usersApi";

// DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
// export interface UserFormState extends Omit<User, "id"> {
//   password?: string;
// }
export interface UserFormState extends Omit<User, "id"> {}

export function useUserForm(user?: User, onSuccess?: () => void) {
  const [form, setForm] = useState<UserFormState>({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
    // login: user?.login || "",
    // administrator: user?.administrator || false,
    // password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname,
        lastname: user.lastname,
        // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
        // login: user.login,
        // administrator: user.administrator,
        // password: "",
      });
    } else {
      setForm({
        firstname: "",
        lastname: "",
        // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
        // login: "",
        // administrator: false,
        // password: "",
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
        // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
        // const { password, ...rest } = form;
        // const updateData = password ? { ...rest, password } : rest;
        const rest = { firstname: form.firstname, lastname: form.lastname };
        await usersApi.updateUser(user.id, rest);
      } else {
        // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
        // if (!form.password) {
        //   setError("Le mot de passe est requis pour la création.");
        //   setLoading(false);
        //   return;
        // }
        await usersApi.createUser({
          firstname: form.firstname,
          lastname: form.lastname,
          // DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire
          // login: form.login,
          // administrator: form.administrator,
          // password: form.password || "",
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
