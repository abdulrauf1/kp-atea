import { useAuthContext } from "../../firebase/useAuth";

export default function Navbar() {
  const { user, logout, role } = useAuthContext();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await logout();
      window.location.href = "/"; // redirect to login
    }
  };

  return (
    <header className="bg-white shadow flex justify-between items-center p-4">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="font-medium">{user?.email}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
