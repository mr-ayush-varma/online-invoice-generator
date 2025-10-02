import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";
import Loader from "./Loader";

const HistoryModal = ({ toggle, formData, setFormData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(db, "formData");
    onValue(dataRef, (snapshot) => {
      const dataList = [];
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.id = childSnapshot.key;
        dataList.push(item);
      });
      setData(dataList);
    });
  }, []);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg shadow-xl transform transition-all h-[80%] w-[70%] p-10 overflow-auto relative">
        <button
          onClick={() => toggle(false)}
          className="absolute top-3 right-5 text-red-600 text-xl"
        >
          ❌
        </button>

        {data.length === 0 ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Bill No</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">State</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Zip</th>
                  <th className="border p-2">Months</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border p-2">{item.billNo}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.phone}</td>
                    <td className="border p-2">{item.amount}</td>
                    <td className="border p-2">{item.date}</td>
                    <td className="border p-2">{item.address}</td>
                    <td className="border p-2">{item.state}</td>
                    <td className="border p-2">{item.city}</td>
                    <td className="border p-2">{item.zip}</td>
                    <td className="border p-2">{item.months}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => {
                          setFormData(item); // set row data
                          toggle(false); // close modal (optional)
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Use Data
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
