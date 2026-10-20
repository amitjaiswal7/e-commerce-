import React, { useState } from "react";
import "../design/user.account.css"
import { user_validation } from "../validation/user.validater";
import {set, z} from "zod";
import {  FiUser,  FiMail,  FiMapPin,  FiHash,  FiPhone,  FiHome,  FiEdit2,  FiSave,  FiX,  FiShield,} from "react-icons/fi";
import { useEffect } from "react";
import { user_detail_axuios } from "../axios/product.axios";
import { useAuth } from "../context/User.login.context";
import { user_detail_update_axio } from "../axios/product.axios";
function User_account() {
  

  const [edit, setedit] = useState(true)
  const [from , setform] = useState({
 username: "",
  email:"",
   number:"", 
   city:"", 
   address : "", 
   pincode : "",
   image : null
   
  })

  const {accessToken} = useAuth()

  useEffect(()=>{
    (async()=>{
      const reponse = await user_detail_axuios(accessToken)
      console.log(reponse.user);
      const user = reponse.user;
    

  setform((pre)=>({
    ...pre,
    username : user.name,
    email : user.email,
    number : user.number ??  "",
    city : user.city ?? "",
    address : user.address ?? "",
    pincode : user.pincode ?? "",
    image:  user.image ?? null


  }))

    })()
  },[])
  const [texterror , setexterror] = useState({})
  function text_hendle(e){
    const {name, value , files, type} = e.target;
   
    setform((pre)=>({
      ...pre,
      [name] : type === "file" ? files[0] : value
    
    }))
      
  }

  async function hendle_sned_data(){
    
    const response =  user_validation.safeParse(from)
    if(!response.success){

    console.log(response.error.flatten().fieldErrors);

    setexterror(response.error.flatten().fieldErrors);
    return ;
    }

   
    const validate = response.data;

    const fromdata = new FormData();

    fromdata.append("username" , validate.username);
    fromdata.append("email" , validate.email);
    
    if(validate.number !== undefined){
      fromdata.append("number", validate.number)
    }
      if(validate.city !== undefined){
      fromdata.append("city", validate.city)
    }
      if(validate.address !== undefined){
      fromdata.append("address", validate.address)
    }
      if(validate.pincode !== undefined){
      fromdata.append("pincode", validate.pincode)
    }


    if(validate.image instanceof File)
{
  fromdata.append("image", validate.image)
}
console.log([...fromdata.entries()]);
     

    const check = await user_detail_update_axio(accessToken, fromdata)
    console.log(check)
    setedit(true)
    
  }

  return (
    <div className="user-account-page">

      {/* Decorative Background */}
      <div className="account-bg-shape account-bg-shape-one"></div>
      <div className="account-bg-shape account-bg-shape-two"></div>

      <div className="user-account-card">

        {/* ================= PROFILE HEADER ================= */}

        <div className="account-top">

          <div className="account-profile">

            <div className="account-avatar">
              <FiUser />
            </div>

            <div className="account-profile-info">
              <div className="account-name-row">
                <h2>user.username</h2>

                <span className="account-verified">
                  <FiShield />
                  Verified
                </span>
              </div>

              <p>ser.email</p>
            </div>

          </div>

          <div className="account-member">
            <span className="account-online-dot"></span>
            Active Account
          </div>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="account-content">

          <div className="account-heading">

            <div>
              <span>ACCOUNT SETTINGS</span>
              <h3>Personal Information</h3>
              <p>
                Keep your personal details up to date.
              </p>
            </div>

          </div>


          <div className="account-grid">

            {/* USERNAME */}
            <div className="account-field">

              <label>
                <FiUser />
                Username
              </label>

              <div className="account-input-wrapper">
                <input
                     type="text"
                    name="username"
                    value={from.username}
                    onChange={text_hendle}
                   readOnly={edit}
       

                
                />
              </div>

              {texterror.username && (
                 <p className="input-error">
                  {texterror.username[0]}
                 </p>
              )}

            </div>


            {/* EMAIL */}
            <div className="account-field">

              <label>
                <FiMail />
                Email Address
              </label>

              <div className="account-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={from.email}
                   readOnly={edit}
                  onChange={text_hendle}
                      
                
                />
              </div>
                  {texterror.email && (
                 <p className="input-error">
                  {texterror.email[0]}
                 </p>
              )}

            </div>


            {/* PHONE */}
            <div className="account-field">

              <label>
                <FiPhone />
                Phone Number
              </label>

              <div className="account-input-wrapper">
                <input
                  type="tel"
                  name="number"
                  value={from.number}
                  onChange={text_hendle}
                       readOnly={edit}
          
            
                />
              </div>

                  {texterror.number && (
                 <p className="input-error">
                  {texterror.number[0]}
                 </p>
              )}

            </div>


            {/* CITY */}
            <div className="account-field">

              <label>
                <FiHome />
                City
              </label>

              <div className="account-input-wrapper">
                <input
                  type="text"
                  name="city"
                  value={from.city}
                       readOnly={edit}
                  onChange={text_hendle}

                   
         
                />
              </div>
                  {texterror.city && (
                 <p className="input-error">
                  {texterror.city[0]}
                 </p>
              )}

            </div>


            {/* ADDRESS */}
            <div className="account-field account-field-wide">

              <label>
                <FiMapPin />
                Address
              </label>

              <div className="account-input-wrapper">
                <input
                  type="text"
                  name="address"
                value={from.address}
                     readOnly={edit}
                  onChange={text_hendle}
 
                />
              </div>
                  {texterror.address && (
                 <p className="input-error">
                  {texterror.address[0]}
                 </p>
              )}

            </div>


            {/* PINCODE */}
        



  <div className="account-field">

              <label>
                <FiHash />
                Pincode
              </label>

              <div className="account-input-wrapper">
                <input
                  type="text"
                  name="pincode"
                  value={from.pincode}
                       readOnly={edit}
                  onChange={text_hendle}
                                              
         
            
                />
              </div>
                  {texterror.pincode && (
                 <p className="input-error">
                  {texterror.pincode[0]}
                 </p>
              )}

            </div>

                <div className="user-profile-image">

              <label>
                <FiHash />
                image
              </label>

              <div className="account-input-wrapper">
                <input
                  type="file"
                  name="image"
                     readOnly={edit}
                  onChange={text_hendle}
                                            
         
            
                />
              </div>

                  {texterror.image && (
                 <p className="input-error">
                  {texterror.image[0]}
                 </p>
              )}

            </div>


          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="account-footer">

          <div className="account-footer-text">
            <span>Your information is private</span>
          </div>


          <div className="account-actions">
 

          {edit ? ( 
             <button
                onClick={()=>{setedit(false)}}
                
                className="account-edit-btn"

              
              >
                <FiEdit2 />
                Edit Profile
              </button>) : (      <>
                <button
                 onClick={()=>{setedit(true)}}
                  className="account-cancel-btn"
                  
                >
                  <FiX />
                  Cancel
                </button>

                <button
                  className="account-save-btn"
                  onClick={()=>{hendle_sned_data()}}
          
                >
                  <FiSave />
                  Save Changes
                </button>
              </>) }
            



        

            

          </div>

        </div>

      </div>

    </div>
  );
}

export default User_account;