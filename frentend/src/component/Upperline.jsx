import React, { useState } from "react";
import "../design/upperline.css"
import {  FaFire,  FaTshirt,  FaMobileAlt,  FaLaptop,  FaRegSmile,  FaHome,  FaBlender,  FaGamepad,  FaAppleAlt,  FaCar,  FaDumbbell,
  FaCouch,  FaBook} from "react-icons/fa";
  import Sidebar from "./Sidebar";
  import { product_search_input } from "../axios/product.axios";
 import { useAuth } from "../context/User.login.context";
  import { product_get } from "../axios/product.axios";

const categories = [
  {
    name: "For You",
    icon: <FaFire />,
  },
  {
    name: "Fashion",
    icon: <FaTshirt />,
  },
  {
    name: "Mobile",
    icon: <FaMobileAlt />,
  },
  {
    name: "Electronics",
    icon: <FaLaptop />,
  },
  {
    name: "Beauty",
    icon: <FaRegSmile />,
  },
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Appliances",
    icon: <FaBlender />,
  },
  {
    name: "Toys",
    icon: <FaGamepad />,
  },
  {
    name: "Food & Health",
    icon: <FaAppleAlt />,
  },
  {
    name: "Vehicles",
    icon: <FaCar />,
  },
  {
    name: "Sports",
    icon: <FaDumbbell />,
  },
  {
    name: "Furniture",
    icon: <FaCouch />,
  },
  {
    name: "Books",
    icon: <FaBook />,
  },
];



const Upperline = () => {



  const [textcategory, setcategory] = useState("For You")
  const {setsearchproduct} = useAuth();
const [sidebaropen, setsidebaropen] = useState(false)
  const click_hendle = async (category) =>{

     setcategory(category);
     console.log(category);
     
      if(category === "For You"){
        setsearchproduct("")
      }
     const response = await product_search_input(textcategory)
   
     const product =   response.data?.data;
     setsearchproduct(product)
  }
  
  const sidebar_open =() =>{
  setsidebaropen(true)
  }
  const sidebar_close = ()=>{
    setsidebaropen(false)
  }


  return (
    <div className="upperline-wrapper">
     <Sidebar 
  isOpen={sidebaropen}
  closeSidebar={sidebar_close}
/>
           
      <div className="upperline-container"  >
       <button className="upperline-menu-button" onClick={sidebar_open} >
 ☰
      <span>Menu</span>
       </button>


        {categories.map((category, index) => (
          <button 
             
            key={category.name} 

            onClick={()=> click_hendle(category.name)}
            className={`upperline-item ${
                textcategory  === category.name ? "upperline-active" : ""
            }`}
      
          >

            <span className="upperline-icon">
              {category.icon}
            </span>

            <span className="upperline-text">
              {category.name}
            </span>

          </button>
        ))}

      </div>

    </div>
  );
};

export default Upperline;

