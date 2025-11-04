import { useAuthContext } from "../../firebase/useAuth";

export default function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <header className="bg-white shadow flex justify-between items-center p-4">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <span>{user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
