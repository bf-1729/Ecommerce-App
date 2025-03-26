import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [company, setCompany] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const validateForm = () => {
        if (!(image1 || image2 || image3 || image4)) {
            toast.error("At least one image must be uploaded.");
            return false;
        }
        if (company.trim().length  === 0) {
            toast.error("Brand name required");
            return false;
        }
        if (name.trim().length=== 0) {
            toast.error("Product name required");
            return false;
        }
        if(description.trim().length <= 10){
            toast.error("Description must be atleast 10 letters")
            return false
        }
        if (!price || price <= 0) {
            toast.error("Price required and should be greater than 0");
            return false;
        }
        if (sizes.length === 0) {
            toast.error("At least one size must be selected.");
            return false;
        }
        return true;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const formData = new FormData();
            formData.append("company", company);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setCompany('');
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setSizes([]);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 lg:ml-44 ml-20 mt-12'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {[1, 2, 3, 4].map((num) => (
                        <label key={num} htmlFor={`image${num}`}>
                            <img
                                className='w-20'
                                src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
                                alt=''
                            />
                            <input
                                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                                type='file'
                                id={`image${num}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Brand name</p>
                <input onChange={(e) => setCompany(e.target.value)} value={company} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Type here'></textarea>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='number' placeholder='25' />
                </div>
            </div>
            
            <div>
                <p className='mb-2'>Product sizes</p>
                <div className='flex gap-2 flex-wrap'>
                    {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                        <div key={size} onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? "bg-teal-400" : "bg-slate-200"} rounded-sm px-4 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestSeller((prev) => !prev)} checked={bestSeller} type='checkbox' id='bestseller' />
                <label className='cursor-pointer' htmlFor='bestSeller'>Add to bestseller</label>
            </div>

            <button type='submit' className='w-28 lg:py-3 py-2 mt-4 rounded-sm bg-black text-white lg:hover:bg-white border lg:hover:text-black border-black'>ADD</button>
        </form>
    );
};

export default Add;
