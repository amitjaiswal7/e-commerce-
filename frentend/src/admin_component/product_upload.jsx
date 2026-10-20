import { useState } from "react";
import {
  FiPackage,
  FiImage,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";

import { useAuth } from "../context/User.login.context";
import { Product_post_to } from "../axios/product.axios";
import { FaRupeeSign } from "react-icons/fa";
import "../design/product.upload.css"

const ProductUpload = () => {

 
    const [product , setproduct] = useState({
        name:"",
        description:"",
        image:null, 
        price:"", 
        discount:"", 
        category:"" ,
        brand:"",
    });
  const {  accessToken } = useAuth();

    function hanlde_product(e){
        const {name, value, files} = e.target;

        setproduct((pres)=>({
            ...pres,
            [name] : files ? files[0] : value
        }))
    }

    async function handle_save_product(){
        try {

          const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("image", product.image);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("category", product.category);
    formData.append("brand", product.brand);



          const resonse = await Product_post_to( accessToken,formData);
          console.log(resonse)
        } catch (error) {
          console.log(error)
        }
    }

    return (
      <div className="product-upload">

      <div className="upload-header">
        <div>
          <h1>Add Product</h1>
          <p>Create a new product for your store</p>
        </div>

        <FiPackage />
      </div>

      <div className="upload-card">

        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>

          <div className="input-box">
            <FiPackage />

            <input
              type="text"
              name="name"
              onChange={hanlde_product}
              placeholder="Enter product name"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            onChange={hanlde_product}
            placeholder="Enter product description..."
          />
        </div>

        {/* Product Image */}
        <div className="form-group">
          <label>Product Image</label>

          <div className="image-upload">
            <FiImage />

            <span>Upload product image</span>

            <small>PNG, JPG or WEBP</small>

            <input
              type="file"
              name="image"  
              onChange={hanlde_product}
            />
          </div>
        </div>

        {/* Price */}
        <div className="price-grid">

          <div className="form-group">
            <label>Price</label>

            <div className="input-box">
              < FaRupeeSign />

              <input
                name="price"
                onChange={hanlde_product}
                type="number"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Discount */}
          <div className="form-group">
            <label>Discount Price</label>

            <div className="input-box">
              < FaRupeeSign/>

              <input
                name="discount"
                onChange={hanlde_product}
                type="number"
                placeholder="0.00"
              />
            </div>
          </div>

        </div>

        {/* Category & Brand */}
        <div className="price-grid">

          <div className="form-group">
            <label>Category</label>

            <div className="input-box">
              <FiTag />

              <select
                name="category"
                onChange={hanlde_product}
              >
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Brand</label>

            <div className="input-box">
              <FiTag />

              <select
                name="brand"
                onChange={hanlde_product}
              >
                <option value="">Select brand</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="apple">Apple</option>
              </select>
            </div>
          </div>

        </div>

        <button className="upload-btn" onClick={handle_save_product}>
          <FiPackage />
          Add Product
        </button>

      </div>
    </div>
  
  );
};

export default ProductUpload;