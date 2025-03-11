//function for add product
import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js"
const addProduct = async(req,res)=>{
    try{
        const {company,name,description,price,category,subCategory,sizes,bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )
        const productData = {
            company,
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller === 'true' ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }
        console.log(productData)

        const product = new productModel(productData);
        await product.save();
        res.json({success:true,message:"Product Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for list product
const listProducts = async(req,res)=>{
    try{
        const products = await productModel.find({})
        console.log(products);
        
        res.json({success:true,products})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//function for removing product product
const removeProduct = async(req,res)=>{
    try{
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product Removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

const getItem = async (req, res) => {
    const itemId = req.body.itemId;
    
    try {
        const item = await productModel.findOne({ _id: itemId });
        if (item) {
            return res.json({ success: true, item });  // Use return to stop further code execution
        } else {
            return res.json({ success: false, message: "Item not found" }); // Handle case if item is not found
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const editItem = async (req, res) => {

    try{
        const editItemData = req.body.editItem;
        const item = await productModel.findById(editItemData._id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        // Update fields safely
        item.company = editItemData.company || item.company;
        item.name = editItemData.name || item.name;
        item.description = editItemData.description || item.description;
        item.category = editItemData.category || item.category;
        item.subCategory = editItemData.subCategory || item.subCategory;
        item.price = editItemData.price || item.price;
        item.sizes = typeof editItemData.sizes === "string" ? JSON.parse(editItemData.sizes) : editItemData.sizes || item.sizes;

        item.bestSeller = editItemData.bestSeller || item.bestSeller;

        await item.save();
        console.log("Updated item:", item);

        res.status(200).json({ success: true, message: "Item updated successfully", item });
    } catch (error) {
        console.error("Error in editItem:", error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};



const singleProduct = async(req,res)=>{
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.json({success:true,product})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

export {listProducts,addProduct,removeProduct,getItem,singleProduct,editItem}