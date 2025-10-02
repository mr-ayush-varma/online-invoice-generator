import React from "react";

const PreviewBillForm = ({ formData, componentRef }) => {
  return (
    <div
      ref={componentRef}
      className="bg-white text-black print:bg-white print:text-black w-full min-h-screen p-4 md:p-8 print:p-0 print:m-0 print:shadow-none"
    >
      <div className="max-w-[210mm] w-full mx-auto print:w-[210mm] print:h-[297mm] print:max-w-none print:m-0 print:rounded-none print:shadow-none">
        {/* Header */}
        <header className="bg-blue-800 text-white text-center py-6 print:bg-blue-800 print:text-white">
          <h1 className="text-3xl font-bold tracking-widest uppercase">
            Invoice
          </h1>
          <div className="mt-2 text-sm space-y-1 leading-relaxed">
            <p className="font-semibold text-xl">AGNIVESH BAIJNATH VERMA</p>
            <p>42, Keshav Villa, Dindoli, Surat, Gujarat 394210</p>
            <p>Email: agnivesh60@gmail.com</p>
            <p>Contact: +91 99792 62575</p>
            <p>PAN: AGWPV1635J</p>
          </div>
        </header>

        {/* Bill To / Date */}
        <section className="flex justify-between items-start p-6 border-b border-gray-300 text-sm print:text-xs">
          <div className="space-y-1 text-gray-800">
            <h2 className="font-semibold text-base">Billed To</h2>
            <p>{formData?.name}</p>
            <p>{formData?.address}</p>
            <p>Contact: {formData?.phone}</p>
          </div>
          <div className="text-right space-y-1 text-gray-800">
            <p>
              Invoice No: <strong>#{formData?.billNo}</strong>
            </p>
            <p>Date: {formData?.date}</p>
            {/* <p>Month: {formData?.month || "July"}</p> */}
          </div>
        </section>

        {/* Table */}
        <section className="p-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse text-gray-800 text-sm print:text-xs">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="text-left py-2 px-2">S.NO</th>
                <th className="text-left py-2 px-2">DESCRIPTION</th>
                <th className="text-right py-2 px-2">RATE (₹)</th>
                <th className="text-right py-2 px-2">QTY</th>
                <th className="text-right py-2 px-2">TOTAL (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-2">1</td>
                <td className="py-3 px-2">
                  Maintenance of Energy Goods ( Month of {formData?.month} )
                </td>

                <td className="py-3 px-2 text-right">
                  {Number(formData?.amount || 0).toFixed(2)}
                </td>
                <td className="py-3 px-2 text-right">
                  {Number(formData?.qty || 0)}
                </td>
                <td className="py-3 px-2 text-right">
                  {(
                    Number(formData?.amount || 0) * Number(formData?.qty || 1)
                  ).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Payment Info */}
        <section className="p-6 border-t border-gray-300 flex justify-between items-start text-sm print:text-xs">
          <div className="space-y-2 text-gray-800">
            <h3 className="font-semibold text-base">Payment Details</h3>
            <p>Method: {formData?.payment_method || "Cheque"}</p>

            {formData?.payment_method === "Bank Transfer" && (
              <>
                <p>Bank: {formData?.bank_name || "HDFC"}</p>
                <p>Account No: {formData?.account_no || "0000000000000"}</p>
                <p>IFSC: {formData?.ifsc || "HDFC0000001"}</p>
              </>
            )}
          </div>
          <div className="text-right space-y-2 text-gray-800">
            <p>
              Subtotal: ₹{" "}
              {(
                Number(formData?.amount || 0) * Number(formData?.qty || 1)
              ).toFixed(2)}
            </p>
            <p className="font-bold text-lg print:text-base">
              Total: ₹{" "}
              {(
                Number(formData?.amount || 0) * Number(formData?.qty || 1)
              ).toFixed(2)}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-300 text-center text-sm print:text-xs">
          <div className="flex justify-between items-center print:mt-10">
            <div className="text-gray-800">
              <p>Receiver's Signature</p>
              <div className="border-b border-gray-400 w-32 mx-auto mt-2" />
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">For AGNIVESH BAIJNATH VERMA</p>
              <div className="border-b border-gray-400 w-32 mx-auto mt-2" />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Thank you for your business!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PreviewBillForm;
