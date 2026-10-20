import  jwt  from "jsonwebtoken";

const check_admin_role_middleware = async (req,res , next) =>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
        success: false,
        message: "Access token required",
        })
    }

    const token =authHeader.split(" ")[1];
   if(!token){
    return res.status(401).json({
        success: false,
        message: "Access token missing", 
    })
   }



   const decoded = jwt.verify(token, process.env.SECRET_KEY);

   req.user = decoded;
   
   next();




}