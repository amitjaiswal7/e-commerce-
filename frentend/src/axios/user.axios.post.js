import { instarnce } from "./user.axios";

export const login_user = async (text) =>{
    const response =  await instarnce.post("/api/login",text);
    return response;
}


// export const refresh_token = async () =>{

//     const response = await instarnce.post("/api/rfre");
//     return response;
// }

export const refresh_token_axios = async () => {
  const response = await instarnce.post("/api/refresh");
  return response;
};