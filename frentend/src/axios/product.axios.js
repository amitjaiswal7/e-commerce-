import { instarnce } from "./user.axios";
export const product_get = async (page = 1) => {
  const response = await instarnce(
    `/api/product?page=${page}&limit=10`
  );

  return response.data;
};

 export const banner_get = async () =>{
    const response = await instarnce("/api/banner-image");
    return response.data.response;
}
 
export const get_product_by_id_axios =  async(id) =>{
    const response = await instarnce.get(`/api/prodcutdetail/${id}`);
  console.log("AXIOS RESPONSE:", response.data);
  return response.data;
}

// input  search  

export const product_search_input  = async (text)=>{
    const response = await instarnce.get("/api/product-search-input",{
        params:{
            text
        }
    }
    
    );
    return response;
}

// add to card product ************************************************************************************************

export const add_to_card_product_axios = async (productid, accessToken) =>{
    

    const reponse = await instarnce.post("/api/add-to-card", {
      productId: productid,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    return reponse.data;

}
export const get_current_add_to_caed_axios = async (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  const response = await instarnce.get(
    "/api/add-to-card-current",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};


// user detail *****************************************************************************************************


export const user_detail_axuios = async(accessToken) =>{

  if(!accessToken){
    throw new Error("acccess token is missing")
  }
const reponse = await instarnce.get('/api/user-detail',{
  headers :{
     Authorization: `Bearer ${accessToken}`,
  }
});
return reponse.data;
}

// user detail update *******************************************************************************************************
 export const user_detail_update_axio = async(accessToken,text) => {
 if(!accessToken){
  throw new Error("acccess token is missing")
 };
 const response = await instarnce.patch("/api/user-detail-update",text,{

  headers:{
   Authorization: `Bearer ${accessToken}`,
  }
 })
 return response; 
 }

//  product upload *****************************************************************************************************

export const Product_post_to = async(accessToken,text) =>{

  if(!accessToken){
  throw new Error("acccess token is missing")
 };
    const  response =  await instarnce.post(`/api/upload`,text,{
        headers:{
   Authorization: `Bearer ${accessToken}`,
  }
    });
    return response;
}

// banner upload ********************************************************************************************************
export const banner_upload_axios = async (formData) => {

  const response = await instance.post(
    "/api/product/upload-image",
    formData
  );

  return response;
};