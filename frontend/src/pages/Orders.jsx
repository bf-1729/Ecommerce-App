import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    }
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token, loadOrderData]);

  return (
    <div className="w-96 mx-auto mt-24">
      <div className="text-2xl lg:ml-0 -ml-3">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No orders found.</p>
      ) : (
        <div className="grid">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md lg:p-5 p-4 flex flex-col md:flex-row items-center justify-between border border-gray-200"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4 w-full md:w-2/5">
                <img
                  src={item.image?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="lg:text-lg text-md">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    {currency}
                    {item.price} • Qty: {item.quantity} • Size: {item.size}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Ordered on: {new Date(item.date).toDateString()}
                  </p>
                </div>
              </div>

              {/* Status & Payment */}
              <div className="w-full md:w-1/4  md:text-left">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  Payment: {item.paymentMethod}
                </p>
              </div>

              {/* Track Order Button */}
              <button
                onClick={loadOrderData}
                className="bg-blue-500 lg:ml-0 ml-72 lg:mt-0 -mt-10 text-white px-5 py-2 text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-all"
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
