import { useState } from "react";
import UserForm from "./UserForm";
import UserById from "./UserById";
import { useUsers } from "../../hooks/userList";
import type { User } from "../../types/User";

function UserList() {
  const { users, loading, error, deleteUser, loadUsers } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [showSearchById, setShowSearchById] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="user-list">
      {showForm ? (
        <div>
          <h2>
            {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h2>
          <UserForm
            user={editingUser || undefined}
            onSuccess={() => {
              setShowForm(false);
              setEditingUser(null);
              loadUsers();
            }}
          />
          <button
            onClick={() => {
              setShowForm(false);
              setEditingUser(null);
              loadUsers();
            }}
          >
            Fermer
          </button>
        </div>
      ) : showSearchById ? (
        <div>
          <UserById />
          <button onClick={() => setShowSearchById(false)}>Fermer</button>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            Ajouter un utilisateur
          </button>
          <button
            onClick={() => setShowSearchById(true)}
            style={{ marginLeft: 8 }}
          >
            Rechercher par ID
          </button>
          {users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  {/* DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire */}
                  {/* <th>Login</th> */}
                  {/* <th>Administrateur</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    {/* DÉSACTIVÉ POUR BACKEND SIMPLIFIÉ - Réactiver si nécessaire */}
                    {/* <td>{user.login}</td> */}
                    {/* <td>{user.administrator ? "Oui" : "Non"}</td> */}
                    <td>
                      <button onClick={() => deleteUser(user.id!)}>
                        Supprimer
                      </button>
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setShowForm(true);
                        }}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;
