import { useUserById } from "../../hooks/userById";
import { useUsers } from "../../hooks/userList";

export default function UserById() {
  const { users } = useUsers();
  const { userId, setUserId, user, loading, error, handleSearch } =
    useUserById();

  return (
    <div className="user-by-id">
      <form onSubmit={handleSearch}>
        <label htmlFor="userId">Rechercher par ID :</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">-- Sélectionner un ID --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              ID {user.id} - {user.firstname} {user.lastname}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          Rechercher
        </button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}
      {user && (
        <table className="table">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              {/* DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire */}
              {/* <th>Login</th> */}
              {/* <th>Administrateur</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              {/* DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire */}
              {/* <td>{user.login}</td> */}
              {/* <td>{user.administrator ? "Oui" : "Non"}</td> */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
