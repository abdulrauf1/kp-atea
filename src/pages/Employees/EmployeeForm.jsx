import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../firebase/useAuth";

export default function EmployeeForm({ onDone }) {
  const { appUser } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [designation, setDesignation] = useState("");
  const [basicPay, setBasicPay] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const instituteId = appUser?.role === "InstituteRep" ? appUser.instituteId : ( /* allow superadmin to choose via UI */ null );
    await addDoc(collection(db, "employees"), {
      fullName,
      cnic,
      designation,
      basicPay: basicPay ? Number(basicPay) : null,
      joiningDate: serverTimestamp(),
      instituteId,
      createdAt: serverTimestamp()
    });
    setFullName(""); setCnic(""); setDesignation(""); setBasicPay("");
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded"/>
      <input value={cnic} onChange={e=>setCnic(e.target.value)} placeholder="CNIC" className="w-full p-2 border rounded"/>
      <input value={designation} onChange={e=>setDesignation(e.target.value)} placeholder="Designation" className="w-full p-2 border rounded"/>
      <input value={basicPay} onChange={e=>setBasicPay(e.target.value)} placeholder="Basic pay" className="w-full p-2 border rounded"/>
      <button className="px-4 py-2 rounded bg-indigo-600 text-white">Add employee</button>
    </form>
  );
}
