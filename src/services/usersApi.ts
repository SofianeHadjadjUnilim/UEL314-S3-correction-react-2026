import type { User } from "../types/User";

export type CreateUserPayload = Omit<User, "id">;
export type UpdateUserPayload = Partial<User>;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const usersApi = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  },

  async getOneUser(id: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  },

  async createUser(user: CreateUserPayload): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  },

  async updateUser(id: string, user: UpdateUserPayload): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur réseau");
  },
};
