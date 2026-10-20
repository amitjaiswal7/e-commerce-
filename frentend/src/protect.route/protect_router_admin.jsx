import { Navigate } from "react-router-dom";
import { useAuth } from "../context/User.login.context";


export const Product_route_for_admin = ({children}) =>{

    const {user, loading , accessToken} = useAuth();


    if(loading){
        return <p>loading.......</p>
    }

     if(user.role !== "admin"){
        return <Navigate to="/" replace />
     }

     return children;
    
}