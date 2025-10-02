import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AddBillForm from "../components/AddBillForm";
import PreviewBillForm from "../components/PreviewBillForm";
import HistoryModal from "../components/HistoryModal";

const AddBill = ({ signOut, userData, setLoading }) => {
  const [formData, setFormData] = useState({
    bank_name: "AGNIVESH BAIJNATH VERMA",
    account_no: "30994217248",
    ifsc: "SBIN0010947",
  });
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${formData?.billNo || "N/A"}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        .print-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 0;
          margin: 0;
        }
        .preview-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          box-shadow: none;
          border: none;
          border-radius: 0;
        }
      }
    `,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsLoggingOut(true);
      setLoading(true);
      setTimeout(() => {
        signOut();
        setLoading(false);
        setIsLoggingOut(false);
      }, 1500); // Reduced timeout for better UX
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row p-4 md:p-6 print:h-full print:bg-white print:p-0">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="fixed z-50 bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Print Invoice"
        aria-label="Print Invoice"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm4-14V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2h6z"
          />
        </svg>
      </button>

      {/* History Button */}
      <button
        onClick={() => setIsHistoryModalOpen(true)}
        className="fixed z-50 bottom-20 right-6 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500"
        title="View History"
        aria-label="View History"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`fixed z-50 top-6 right-6 rounded-full overflow-hidden transition-opacity ${
          isLoggingOut ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
        }`}
        title="Log Out"
        aria-label="Log Out"
      >
        <img
          className="h-12 w-12 rounded-full border-2 border-gray-300"
          src={userData?.photoURL || "https://via.placeholder.com/40"}
          alt={userData?.displayName || "User"}
        />
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="w-full md:w-1/2">
          <AddBillForm
            formData={formData}
            handlePrint={handlePrint}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </div>
        <div className="w-full md:w-1/2 print-container">
          <div className="preview-container">
            <PreviewBillForm formData={formData} componentRef={componentRef} />
          </div>
        </div>
      </div>

      {/* History Modal */}
      {isHistoryModalOpen && (
        <HistoryModal
          formData={formData}
          setFormData={setFormData}
          toggle={setIsHistoryModalOpen}
        />
      )}
    </div>
  );
};

export default AddBill;
