import Sidebar from "../../components/Layout/Sidebar.jsx";
import Navbar from "../../components/Layout/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Employees from "../Employees/EmployeeList.jsx";
import Institutes from "../Institutes/InstituteList.jsx";
import Contributions from "../Contributions/ContributionList.jsx";
import TransferHistory from "../Transfers/TransferList.jsx";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/institutes" element={<Institutes />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/transfers" element={<TransferHistory />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
