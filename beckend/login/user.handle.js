import user_model from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashRefreshToken } from "../helper/hashtoken.js";
import session_model from "../model/sessetion.model.js";
import otp_model from "../milldeware/otp.model.js";


export const create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Every field is required",
      });
    }

    // 2. Check existing user
    const check = await user_model.findOne({
      email: email.toLowerCase(),
    });

    if (check) {
      return res.status(409).json({
        success: false,
        message: "User already exists in database",
      });
    }

    // 3. Password hash
    const hash_password = await bcrypt.hash(password, 10);

    // 4. Create user
    const user_create = await user_model.create({
      name,
      email: email.toLowerCase(),
      password: hash_password,
      number :"",
      city:"",
      address:"",
      pincode:"",
      image: null,
      role: "user",
    });

    // 5. Access token
    const accessToken = jwt.sign(
      {
        userId: user_create._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    // 6. Refresh token
    const refreshToken = jwt.sign(
      {
        userId: user_create._id,
      },
      process.env.REFRENCE_KEY,
      {
        expiresIn: "7d",
      }
    );

    // 7. Refresh token hash
const refreshTokenHash = hashRefreshToken(refreshToken);
    

    // 8. Create session in DB
    await session_model.create({
      userId: user_create._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      revoked: false,
    });

    // 9. Refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 10. Response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      accessToken,
      user_create:{
         name : user_create.name
      }
     
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",

    });
  }
};



// find user hadle**********************************************************************************


// 2. Access Token verify hone ke baad
// current user MongoDB se lana
export const get_current_user = async (req, res) => {
  try {
    const user = await user_model
      .findById(req.user.userId)
      .select("-password");

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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// generate new access token 

// 1. Refresh Token → New Access Token

// 1. Refresh Token → New Access Token

export const refresh_access_token = async (req, res) => {
  try {
    // 1. Cookie se refresh token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // 2. Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRENCE_KEY
    );

    // 3. Refresh token ka hash
    const refreshTokenHash =  hashRefreshToken(refreshToken);

    // 4. Active session find
    const session = await session_model.findOne({
      userId: decoded.userId,
      refreshTokenHash,
      revoked: false,
    });

    // 5. Session invalid/revoked
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired or revoked",
      });
    }

    // 6. New access token
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (error) {
    console.log("Refresh Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};


// login *****************************************************************************************************


export const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 2. Find user
    const user = await user_model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 3. Password check
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4. Access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    // 5. Refresh token
    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRENCE_KEY,
      {
        expiresIn: "7d",
      }
    );

    // 6. Hash refresh token
    const refreshTokenHash =  hashRefreshToken(refreshToken);
  

    // 7. Create session
    await session_model.create({
      userId: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      revoked: false,
    });

    // 8. Save refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 9. Response
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};




// logout *********************************************************************************************


export const Logout_user = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {

      // 1. Hash refresh token
      const refreshTokenHash = hashRefreshToken(refreshToken);

      // 2. Current session revoke
      await session_model.findOneAndUpdate(
        {
          refreshTokenHash,
          revoked: false,
        },
        {
          revoked: true,
        }
      );
    }

    // 3. Remove browser cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// delete user fron every devie

export const logout_all_devices = async (req, res) => {
  try {

    // Access token middleware ne req.user banaya hai
    const userId = req.user.userId;

    // User ke all sessions revoke
    await session_model.updateMany(
      {
        userId,
        revoked: false,
      },
      {
        revoked: true,
      }
    );

    // Current browser ki cookie remove
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices",
    });

  } catch (error) {
    console.error("Logout All Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// otp verofication  ****************************************************************************************************


async (req,res) =>{

  const {userId, otp}= req.body;

  if(!userId || !otp){
    res.status(404).json({
      success:false,
    message:"user email , otp required"
    })
  }



  const optdata = await otp_model.findOne({
    userId,
    otp
  })

}