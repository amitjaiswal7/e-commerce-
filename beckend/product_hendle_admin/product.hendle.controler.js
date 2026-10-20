import user_model from "../login/user.model.js";
import product_upload_model from "./prodduct.hendle.model.js";

export const product_upload_admin_controller = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const user = await user_model.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can upload products",
      });
    }

    const {
      name,
      description,
      price,
      discount,
      category,
      brand,
    } = req.body;

    const product = await product_upload_model.create({
      name,
      description,

      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,

      price,
      discount,
      category,
      brand,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Product upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};