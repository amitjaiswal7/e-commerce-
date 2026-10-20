import { date, size, success } from "zod";
import user_model from "../login/user.model.js";
 import { user_detail_update_validation_beckend } from "../validation/user_detail_validation_beckend.js";

export const user_detail_controller = async (req, res) => {
    try {
        const userId = req.user?.userId;
   

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const user = await user_model.findById(userId).select("name email role number city address pincode   ")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("User detail controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user details",
        });
    }
};

// user detail update controller *****************************************************************************************


export const user_detail_update_controller  =     async (req,res)=>{
    try {
         const userId = req.user?.userId;

     const {username, email , number, city , address ,pincode} = req.body;

     let name = username;
     const detail = {  name, email, number, city,address, pincode }

     if(!userId){
        return res.status(400).json({
            message:"user not found"
        })
     }

    let  validate =  user_detail_update_validation_beckend.safeParse(detail);
    
    if(!validate.success){
       return  res.status(400).json({
            success:false,
             error: validate.error.flatten().fieldErrors
        })
            }

     
            const update = {};
            const validatedetail = validate.data;

            if(validatedetail.name !== undefined){
              update.name = validatedetail.name;
            }
            if(validatedetail.email !== undefined){
                update.email = validatedetail.email;
            }
              if(validatedetail.number !== undefined){
                update.number = validatedetail.number;
            }

              if(validatedetail.city !== undefined){
                update.city = validatedetail.city;
            }
              if(validatedetail.address !== undefined){
                update.address = validatedetail.address;
            }
              if(validatedetail.pincode !== undefined){
                update.pincode = validatedetail.pincode;
            }
            
console.log("REQ FILE:", req.file ? {
  mimetype: req.file.mimetype,
  size: req.file.size,
  bufferExists: !!req.file.buffer,
} : "No file received");



if (req.file) {
  const imagecontainer = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!imagecontainer.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Only JPEG, PNG and WebP images are allowed",
    });
  }

  if (req.file.size > 2 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "Image must not exceed 2 MB",
    });
  }

  update.image = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
}


        if(Object.keys(update).length === 0){
            return res.status(400).json({
            success: false,
            message: "No fields provided to update",
            })
        }
          

      const user = await user_model.findByIdAndUpdate(userId,{$set:update}, {new: true , runValidators:true})

     if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
     }

     
     return res.status(200).json({
        success:true,
        message:"profile updated"
     })

    } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });   
    }

     

}