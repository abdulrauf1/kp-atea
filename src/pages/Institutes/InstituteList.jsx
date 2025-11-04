import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../firebase/useAuth";

export default function InstituteList ({ limitCount }){
  const [rows, setRows] = useState([]);
  const { appUser } = useAuthContext();

  useEffect(() => {
    async function load(){
      let q;
      const coll = collection(db, "employees");
      if (appUser?.role === "InstituteRep") {
        q = query(coll, where("instituteId", "==", appUser.instituteId), orderBy("createdAt", "desc"), ...(limitCount ? [limit(limitCount)] : []));
      } else {
        q = query(coll, orderBy("createdAt", "desc"), ...(limitCount ? [limit(limitCount)] : []));
      }
      const snap = await getDocs(q);
      setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    if (appUser) load();
  }, [appUser, limitCount]);

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-slate-500">
            <th>Name</th>
            <th>CNIC</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.fullName}</td>
              <td>{r.cnic}</td>
              <td>{r.designation || "-"}</td>
            </tr>
          ))}
          {rows.length===0 && <tr><td colSpan={3} className="p-4 text-sm text-slate-500">No records</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
