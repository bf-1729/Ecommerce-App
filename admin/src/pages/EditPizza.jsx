import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditPizza = ({ token }) => {
    const { itemId } = useParams();
    const [product, setProduct] = useState(null);

    // State variables for form fields
    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(
                    backendUrl + "/api/product/getitem",
                    { itemId },
                    { headers: { token } }
                );

                if (response.data.success) {
                    setProduct(response.data.item);
                } else {
                    console.error("Error:", response.data.message);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error.message);
            }
        };

        fetchProduct();
    }, [itemId, token]);
    
    useEffect(() => {
        if (product) {
            setCompany(product.company || '');
            setName(product.name || '');
            setDescription(product.description || '');
            setCategory(product.category || '');
            setSubCategory(product.subCategory || '');
            setPrice(product.price || '');
            setSizes(product.sizes || []);
            setBestSeller(product.bestSeller || false);
        }
    }, [product]);

    console.log(product);

    function formhandler(e) {
        e.preventDefault();
        try{
        const editItem = {
            _id: itemId,
            company,
            name,
            description,
            category,
            subCategory,
            price,
            sizes:JSON.stringify(sizes),
            bestSeller
        };
    
    
        axios.post(backendUrl + "/api/product/edititem", {editItem})
        .then((response) => {
            if (response.data.success) {
                toast.success("Product Updated Successfully")
            } else {
                toast.error("Failed to update Item")
            }
        })
        .catch((error) => {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product.");
        })
    }
    catch(error){
        console.log(error);
        
    }
    }

    
    return (
        <div>
        <form className='flex flex-col w-full lg:ml-44 ml-[24%] mt-12 items-start gap-3'>
            
            <div className='w-full'>
                <p className='mb-2'>Brand name</p>
                <input
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                    className='w-full max-w-[500px] px-3 py-2'
                    type='text'
                    placeholder='Type here'
                />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full max-w-[500px] px-3 py-2'
                    type='text'
                    placeholder='Type here'
                />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='w-full max-w-[500px] px-3 py-2'
                    placeholder='Type here'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className='w-full px-3 py-2 sm:w-[120px]'
                        type='number'
                        placeholder='25'
                    />
                </div>
            </div>
            <div>
                <p className='mb-2'>Product sizes</p>
                <div className='flex flex-wrap gap-2'>
                <div onClick={()=>setSizes(prev=>prev.includes("XS") ? prev.filter(item=>item !== "XS") : [...prev,"XS"])}>
                        <p className={`${sizes.includes("XS")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>XS</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("S") ? prev.filter(item=>item !== "S") : [...prev,"S"])}>
                        <p className={`${sizes.includes("S")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item=>item !== "M") : [...prev,"M"])}>
                        <p className={`${sizes.includes("M")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item=>item !== "L") : [...prev,"L"])}>
                        <p className={`${sizes.includes("L")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item=>item !== "XL") : [...prev,"XL"])}>
                        <p className={`${sizes.includes("XL")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item=>item !== "XXL") : [...prev,"XXL"])}>
                        <p className={`${sizes.includes("XXL")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>XXL</p>
                    </div>
                    <div onClick={()=>setSizes(prev=>prev.includes("XXXL") ? prev.filter(item=>item !== "XXXL") : [...prev,"XXXL"])}>
                        <p className={`${sizes.includes("XXXL")?"bg-teal-400":"bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>XXXL</p>
                    </div>
                </div>
        </div>
            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestSeller((prev) => !prev)} checked={bestSeller} type='checkbox' id='bestseller' />
                <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
            </div>
            <button onClick={formhandler} type='submit' className='w-28 lg:py-3 py-2 mt-4 rounded-sm bg-black text-white lg:hover:bg-white border lg:hover:text-black border-black'>
                UPDATE
            </button>
        </form>
        </div>
    );
};

export default EditPizza;
