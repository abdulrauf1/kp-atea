import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../firebase/useAuth";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();
  const { role } = useAuthContext();

  const navItems = [
    { path: "/", label: "Employees", roles: ["SuperAdmin", "InstituteRep"] },
    { path: "/institutes", label: "Institutes", roles: ["SuperAdmin"] },
    { path: "/contributions", label: "Contributions", roles: ["SuperAdmin", "InstituteRep"] },
    { path: "/transfers", label: "Transfers", roles: ["SuperAdmin", "InstituteRep"] },
  ];

  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3 p-4 border-b border-blue-700">
        <img src={logo} alt="KP-ATEA Logo" className="w-10 h-10 rounded-full border border-blue-400" />
        <div>
          <h1 className="text-xl font-bold">KP-ATEA</h1>
          <p className="text-xs text-blue-200">Employee Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2">
        {navItems
          .filter((item) => item.roles.includes(role)) // show items for current role
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 text-sm text-center text-blue-300 border-t border-blue-700">
        © {new Date().getFullYear()} KP-ATEA
      </div>
    </aside>
  );
}
