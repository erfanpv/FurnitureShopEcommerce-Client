// PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";

const PaymentSuccess = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [orderDetails, setOrderDetails] = useState({
    id: "ord_12345",
    customer_email: "customer@example.com",
    payment_status: "succeeded",
    amount_total: 7500, // Amount in cents, so this represents $75.00
    line_items: {
      data: [
        {
          id: "item_001",
          description: "Wireless Headphones",
          quantity: 1,
          price: {
            unit_amount: 2500, // Amount in cents, so this represents $25.00
          },
        },
        {
          id: "item_002",
          description: "Smartphone Case",
          quantity: 2,
          price: {
            unit_amount: 1500, // Amount in cents, so this represents $15.00 each
          },
        },
        {
          id: "item_003",
          description: "Portable Charger",
          quantity: 1,
          price: {
            unit_amount: 2000, // Amount in cents, so this represents $20.00
          },
        },
      ],
    },
  }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPaymentDetails = async () => {
  //     try {
  //       if (!sessionId) return;

  //       // Fetch the checkout session details from the backend
  //       const response = await axios.get(`/api/stripe/session/${sessionId}`);
  //       setOrderDetails(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch payment details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchPaymentDetails();
  // }, [sessionId]);

  const generateInvoice = async () => {
    if (!orderDetails) return;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Add content to the PDF page
    page.drawText("Invoice", { x: 250, y: 370, size: 20, color: rgb(0, 0, 0) });

    page.drawText(`Order ID: ${orderDetails.id}`, { x: 50, y: 330, size: 12 });
    page.drawText(`Customer Email: ${orderDetails.customer_email}`, {
      x: 50,
      y: 310,
      size: 12,
    });
    page.drawText(`Payment Status: ${orderDetails.payment_status}`, {
      x: 50,
      y: 290,
      size: 12,
    });

    let yPosition = 270;
    page.drawText("Products Purchased:", { x: 50, y: yPosition, size: 12 });

    orderDetails.line_items.data.forEach((item, index) => {
      yPosition -= 20;
      page.drawText(
        `${index + 1}. ${item.description} - Quantity: ${item.quantity} - Price: $${(
          item.price.unit_amount / 100
        ).toFixed(2)}`,
        { x: 50, y: yPosition, size: 10 }
      );
    });

    yPosition -= 40;
    page.drawText(
      `Total Amount: $${(orderDetails.amount_total / 100).toFixed(2)}`,
      { x: 50, y: yPosition, size: 12 }
    );

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger download of the PDF file
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.pdf";
    link.click();
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p className="text-lg font-semibold">Loading payment details...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p className="text-red-500 text-lg font-semibold">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 text-center border rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        Payment Successful!
      </h1>
      <p className="text-lg mb-4">
        Thank you for your purchase! Your payment has been successfully processed.
      </p>

      {orderDetails && (
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Order ID:</strong> {orderDetails.id}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Email:</strong> {orderDetails.customer_email}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Total Amount:</strong> $
            {(orderDetails.amount_total / 100).toFixed(2)}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Payment Status:</strong> {orderDetails.payment_status}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Products Purchased</h3>
          <ul className="list-disc list-inside">
            {orderDetails.line_items.data.map((item) => (
              <li key={item.id}>
                {item.description} - {item.quantity} x $
                {(item.price.unit_amount / 100).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={generateInvoice}
        className="inline-block mt-6 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
      >
        Generate Invoice
      </button>

      <a
        href="/"
        className="inline-block mt-6 ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default PaymentSuccess;
