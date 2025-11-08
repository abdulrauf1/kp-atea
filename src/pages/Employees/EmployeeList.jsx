import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuthContext } from "../../firebase/useAuth";
import { app } from "../../firebase/firebaseConfig";

const db = getFirestore(app);

export default function EmployeeList({ instituteOnly }) {
  const { user, role } = useAuthContext();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let q;
        if (role === "SuperAdmin") {
          q = query(collection(db, "employees"));
        } else if (instituteOnly && user) {
          const userSnap = await getDocs(collection(db, "users"));
          const rep = userSnap.docs.find((d) => d.id === user.uid);
          const instId = rep?.data()?.institute_id;
          q = query(collection(db, "employees"), where("institute_id", "==", instId));
        }
        const snapshot = await getDocs(q);
        setEmployees(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, [user, role, instituteOnly]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">CNIC</th>
            <th className="p-2 text-left">Designation</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b">
              <td className="p-2">{emp.full_name}</td>
              <td className="p-2">{emp.cnic}</td>
              <td className="p-2">{emp.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
