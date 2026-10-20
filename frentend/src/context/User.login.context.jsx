import { createContext, useContext, useEffect, useState } from "react";
import { check_user_axios } from "../axios/user.axios";
import { refresh_token_axios } from "../axios/user.axios.post";
import { get_current_add_to_caed_axios } from "../axios/product.axios";



export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [serachproduct , setsearchproduct] = useState(null);
//  add to card 
const [card , setcard] = useState(null)

  // Access Token → React memory
  const [accessToken, setAccessToken] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    (async()=>{
      try {
        const reposne = await get_current_add_to_caed_axios(accessToken);
        setcard(reposne.card);
      } catch (error) {
        console.log(error)
      }
    })()
  },[accessToken])


  // Page load / refresh par
  const checkUser = async () => {
    try {

      // 1. Refresh token cookie se
      // new access token lo
      const refreshResponse = await refresh_token_axios();

      const newAccessToken =
        refreshResponse.data.accessToken;

      // 2. Access token memory mein rakho
      setAccessToken(newAccessToken);

      // 3. Access token se current user check karo
      const userResponse =
        await check_user_axios(newAccessToken);

      if (userResponse.data.success) {
        setUser(userResponse.data.user);
      }

    } catch (error) {

      console.log("User not authenticated");

      setAccessToken(null);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    checkUser();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        serachproduct,
        setsearchproduct, 

        accessToken,
        setAccessToken,

        loading,

        card ,
        setcard,

        checkUser,
     


      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};