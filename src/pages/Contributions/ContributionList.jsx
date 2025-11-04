import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs, limit as limitFn } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../firebase/useAuth";

export default function ContributionsList({ limit = 10 }){
  const [rows, setRows] = useState([]);
  const { appUser } = useAuthContext();

  useEffect(()=>{
    async function load() {
      const coll = collection(db, "contributions");
      let q;
      if (appUser?.role === "InstituteRep") {
        q = query(coll, where("instituteId", "==", appUser.instituteId), orderBy("createdAt", "desc"), limitFn(limit));
      } else {
        q = query(coll, orderBy("createdAt", "desc"), limitFn(limit));
      }
      const snap = await getDocs(q);
      setRows(snap.docs.map(d=>({ id:d.id, ...d.data() })));
    }
    if (appUser) load();
  }, [appUser, limit]);

  return (
    <div>
      <ul className="space-y-2">
        {rows.map(r => (
          <li key={r.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{r.contributionMonth} — {r.amount}</div>
                <div className="text-sm text-slate-500">Paid on: {r.paidOn?.toDate ? r.paidOn.toDate().toLocaleDateString() : '-'}</div>
              </div>
            </div>
          </li>
        ))}
        {rows.length===0 && <li className="text-sm text-slate-500">No contributions yet.</li>}
      </ul>
    </div>
  );
}
