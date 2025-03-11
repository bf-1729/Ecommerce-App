import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  useEffect(() => {
    const handleScroll = () => {
      const cartElement = document.getElementById("cart-total");
      const footerElement = document.getElementById("footer");

      if (!cartElement || !footerElement) return;

      const cartRect = cartElement.getBoundingClientRect();
      const footerRect = footerElement.getBoundingClientRect();

      
      if (footerRect.top < window.innerHeight - 100) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-8 mt-[72px]">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="lg:flex">
        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-[16px] font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        
        <div className={`lg:flex-1 flex justify-end ${cartData.length ? "visible" : "hidden"}`}>
          <div
            id="cart-total"
            className={`bg-white w-full sm:w-[450px] h-[300px] shadow-md py-16 px-4 lg:mt-0 transition-all duration-300 ${
              isFixed
                ? "lg:fixed"
                : "lg:relative lg:bottom-auto"
            }`}
          >
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() =>
                  cartData.length > 0
                    ? navigate("/placeorder")
                    : toast.error("Add products to proceed")
                }
                className="bg-black text-white text-sm my-8 px-8 py-3 lg:hover:bg-white lg:hover:text-black border border-black"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="footer" className="bg-white text-center">
      </div>
    </div>
  );
};

export default Cart;
