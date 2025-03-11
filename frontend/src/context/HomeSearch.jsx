import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './ShopContext';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeSearch = () => {
    const { search, setSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return (
        <div className={`lg:hidden flex items-center justify-center border border-gray-400 px-4 py-0.5 rounded-lg mx-auto bg-white w-[470px] ${visible ? 'block' : 'hidden'}`}>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none px-2 lg:py-0 py-1 w-56 bg-transparent text-gray-800" 
                type="text" 
                placeholder="Search..."
            />
        </div>
    );
};

export default HomeSearch;
