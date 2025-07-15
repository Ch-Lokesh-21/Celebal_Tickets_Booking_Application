export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async ({ amount, bookingDetails, onSuccess }) => {
  const res = await loadRazorpayScript();
  if (!res) return alert("Razorpay SDK failed to load.");

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    currency: "INR",
    amount: amount * 100,
    name: "Ticket Booking App",
    description: "Booking Payment",
    handler: onSuccess,
    prefill: {
      name: bookingDetails.userName,
      email: bookingDetails.userEmail,
    },
  };

  const paymentObj = new window.Razorpay(options);
  paymentObj.open();
};