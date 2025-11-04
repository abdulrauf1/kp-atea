import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-blue-700">
        KP-ATEA
      </div>
      <nav className="flex flex-col p-4 space-y-3">
        <Link to="/" className="hover:bg-blue-700 p-2 rounded">Employees</Link>
        <Link to="/institutes" className="hover:bg-blue-700 p-2 rounded">Institutes</Link>
        <Link to="/contributions" className="hover:bg-blue-700 p-2 rounded">Contributions</Link>
        <Link to="/transfers" className="hover:bg-blue-700 p-2 rounded">Transfers</Link>
      </nav>
    </aside>
  );
}
