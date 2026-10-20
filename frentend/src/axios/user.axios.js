import axios from "axios";

export const instarnce = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 3000,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export const user_signup_axios = async (userform) => {
  const response = await instarnce.post(
    "/api/create",
    userform
  );

  return response;
};


// export const check_user_axios = async (accessToken) =>{

//     const response = await instarnce.get("/api/check",{
//       headers:{
//          Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     return response;
// }

export const check_user_axios = async (accessToken) => {
  const response = await instarnce.get("/api/check", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};


 export const user_logout_axio =  async() =>{
  
  const response =  await instarnce.get("/api/logout");
  return response;
 }



 