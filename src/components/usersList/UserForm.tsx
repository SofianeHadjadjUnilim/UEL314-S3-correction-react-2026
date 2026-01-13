import type { User } from "../../types/User";
import { useUserForm } from "../../hooks/userForm";

interface UserFormProps {
  user?: User;
  onSuccess?: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const { form, loading, error, handleChange, handleSubmit } = useUserForm(
    user,
    onSuccess
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prénom:</label>
        <input
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nom:</label>
        <input
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {user ? "Mettre à jour" : "Enregistrer"}
      </button>
    </form>
  );
}
