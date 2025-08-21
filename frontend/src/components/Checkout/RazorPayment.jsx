import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RazorPayment = () => {
  const navigate = useNavigate();
  const shippingData = JSON.parse(localStorage.getItem("shippingData"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shippingData) {
      navigate("/checkout"); // Redirect if no shipping data
      return;
    }

    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        openRazorpay();
        setLoading(false);
      };
      document.body.appendChild(script);
    };

    const openRazorpay = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: shippingData.totalAmount * 100,
        currency: "INR",
        name: "Tech Store",
        description: "Order Payment",
        handler: function () {
          localStorage.removeItem("cart");
          navigate("/order-success");
        },
        prefill: {
          name: shippingData.name,
          contact: shippingData.phone,
          email: "customer@example.com",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function () {
            setTimeout(() => {
              navigate("/payment-failed");
            }, 300);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
        setTimeout(() => {
          navigate("/payment-failed");
        }, 300);
      });

      paymentObject.open();
    };

    loadRazorpay();
  }, [navigate, shippingData]);

  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-screen
        bg-gradient-to-br from-orange-50 to-orange-100
        p-6
        opacity-0 translate-y-6
        animate-fadeInUp
      "
      style={{ animationFillMode: "forwards", animationDuration: "0.7s" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-orange-700 animate-pulse">
        Processing Payment...
      </h2>
      <p className="mb-8 text-orange-600">Please wait, Razorpay is loading...</p>

      {/* Loader: three bouncing dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-4 h-4 bg-orange-500 rounded-full
              animate-bounce
              "
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* CSS animations injected inline */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
        }
      `}</style>
    </div>
  );
};

export default RazorPayment;
