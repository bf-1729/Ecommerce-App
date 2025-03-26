import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "../context/SearchBar";

const MensWear = () => {
  const { MensProducts, search, showSearch, products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [sortType, setSortType] = useState("relevant");
  const [currentPage, setCurrentPgae] = useState(0)

  const [showCategory, setShowCategory] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const toggleSizes = (e) => {
    if (sizes.includes(e.target.value)) {
      setSizes((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSizes((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...MensProducts];

    if (search.trim() !== "") {
      productsCopy = productsCopy.filter(
        (item) => item.name && item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (price) {
      const minPrice = parseFloat(price);
      productsCopy = productsCopy.filter((item) => item.price >= minPrice);
    }

    if (sizes.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => item.sizes && sizes.every((size) => item.sizes.includes(size))
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    setFilterProducts(MensProducts);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [price, sizes, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  const page_size = 16
  const totalProducts = filterProducts.length;
  const noOfPages = Math.ceil(totalProducts / page_size)
  const start = currentPage * page_size
  const end = start + page_size
  const handlePageChange = (n) => {
    setCurrentPgae(n)
  }

  const goToNextPage = () => {
    setCurrentPgae(prev => prev + 1)
  }

  const goToPrevPage = () => {
    setCurrentPgae(prev => prev - 1)
  }

  return (
    <div className="mt-[64px] border-t">
      <SearchBar/>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        
        <div className="min-w-60 lg:pl-0 pl-1.5">
          <p onClick={() => setShowFilter(!showFilter)}
            className="text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>

          <div className={`border border-gray-300 pl-4 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}>
            <p className="text-sm font-medium flex justify-between items-center cursor-pointer"
              onClick={() => setShowCategory(!showCategory)}>
              TYPE
              <span>{showCategory ? "▲" : "▼"}</span>
            </p>
            {showCategory && (
              <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
                <label><input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear</label>
                <label><input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear</label>
                <label><input type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear</label>
              </div>
            )}
          </div>

          <div className={`border border-gray-300 pl-4 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}>
            <p className="text-sm font-medium flex justify-between items-center cursor-pointer"
              onClick={() => setShowSize(!showSize)}>
              SIZE
              <span>{showSize ? "▲" : "▼"}</span>
            </p>
            {showSize && (
              <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
                {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <label key={size}><input type="checkbox" value={size} onChange={toggleSizes} /> {size}</label>
                ))}
              </div>
            )}
          </div>

          <div className={`border border-gray-300 pl-4 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}>
            <p className="text-sm font-medium flex justify-between items-center">
              PRICE
            </p>
            <div className="flex lg:gap-4 gap-14 items-center mt-2">
              <p className="text-md text-gray-500">Min Price:</p>
              <select className="border-b border-gray-400 text-gray-500 py-1" onChange={(e) => setPrice(e.target.value)} value={price}>
                <option value="">Select Price</option>
                <option value="800">₹800</option>
                <option value="700">₹700</option>
                <option value="600">₹600</option>
                <option value="500">₹500</option>
                <option value="400">₹400</option>
                <option value="300">₹300</option>
                <option value="100">₹100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-2 lg:pr-0 pr-1">
            <Title text1={"MENS"} text2={"COLLECTIONS"} />

            <select onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2">
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="border-b pb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 px-0 w-full">
            {filterProducts.length ? (filterProducts.slice(start, end).map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} company={item.company} image={item.image} price={item.price} />))) 
              : (<div className="flex items-center justify-center text-center text-3xl text-black font-extrabold h-fit lg:w-[900px] w-100"><h1>No Items Found</h1></div>)}
          </div>
          {filterProducts.length ? (
          <div className="flex gap-4 justify-center items-center mt-4">
            <button onClick={() => goToPrevPage()} disabled={currentPage === 0}>
              <img className={`cursor-pointer w-8 h-8 ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : ""}`} src="https://img.icons8.com/flat-round/30/left--v1.png" alt="left--v1" />
            </button>
            {[...Array(noOfPages).keys()].map((n) => (
              <button className={`${n === currentPage ? "actives":""} text-sm border rounded-full w-8 h-8 px-2.5 py-1 m-1`} key={n} onClick={() => handlePageChange(n)}>{n}</button>
            ))}
            <button onClick={() => goToNextPage()} disabled={currentPage === noOfPages - 1}>
              <img className={`cursor-pointer w-8 h-8 ${currentPage === noOfPages - 1 ? "opacity-30" : ""}`} src="https://img.icons8.com/flat-round/30/right--v1.png" alt="right--v1" />
            </button>
          </div>):""}
        </div>
      </div>
    </div>
  );
};

export default MensWear;
