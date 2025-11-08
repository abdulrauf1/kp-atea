import Sidebar from "../../components/Layout/Sidebar.jsx";
import Navbar from "../../components/Layout/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Employees from "../Employees/EmployeeList.jsx";
import Institutes from "../Institutes/InstituteList.jsx";
import Contributions from "../Contributions/ContributionList.jsx";
import TransferHistory from "../Transfers/TransferList.jsx";
import { useAuthContext } from "../../firebase/useAuth";

export default function Dashboard() {
  const { user, role, loading } = useAuthContext();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="p-6">
          {role === "SuperAdmin" ? (
            <Routes>
              <Route path="/" element={<Employees />} />
              <Route path="/institutes" element={<Institutes />} />
              <Route path="/contributions" element={<Contributions />} />
              <Route path="/transfers" element={<TransferHistory />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Employees instituteOnly />} />
              <Route path="/contributions" element={<Contributions instituteOnly />} />
              <Route path="/transfers" element={<TransferHistory instituteOnly />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}
