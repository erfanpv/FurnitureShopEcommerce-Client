import jsPDF from "jspdf";
import "jspdf-autotable";

const generateInvoice = async (order) => {
  const doc = new jsPDF();

  doc.setFillColor(75, 0, 130);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("Invoice", 105, 15, null, null, "center");

  doc.setTextColor(45, 55, 72); 
  doc.setFontSize(12);
  doc.text(`Order ID: ${order.orderId}`, 20, 40);
  doc.text(`Payment ID: ${order.paymentId}`, 20, 50);
  doc.text(`Customer Name: ${order.orderedUserName}`, 20, 60);
  doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 70);
  doc.text(`Order Email: ${order.orderUsermail}`, 20, 80);
  doc.text(`Total Amount: $${order.total.toFixed(2)}`, 20, 90);
  doc.text(`Payment Method: ${order.payment_method}`, 20, 100);
  doc.text(
    `Shipping Address: ${order.shippingAddress.line1}${
      order.shippingAddress.line2 ? ", " + order.shippingAddress.line2 : ""
    }, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.postal_code}`,
    20,
    110
  );

  const products = order.products.map((item) => [
    item.productId.productName,
    item.quantity,
    `$${item.productId.price.toFixed(2)}`,
  ]);

  doc.autoTable({
    head: [["Product", "Quantity", "Price"]],
    body: products,
    startY: 130,
    theme: "grid",
    styles: {
      fontSize: 11,
      halign: "center",
      valign: "middle", 
      fillColor: [240, 240, 240], 
    },
    headStyles: {
      fillColor: [75, 0, 130], 
      textColor: [255, 255, 255], 
      fontSize: 12,
    },
  });


  doc.setFontSize(16);
  doc.setTextColor(75, 0, 130); 
  doc.text("Thank you for your order!", 105, doc.previousAutoTable.finalY + 20, null, null, "center");

  doc.save(`invoice_${order.orderId}.pdf`);
};

export default generateInvoice;
