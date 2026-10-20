import { success } from "zod";
import addtocard_model from "../model/addtocard.model.js";
import product_model from "./product.model.js";
import mongoose from "mongoose";


export const product_get = async (req, res) => {
  try {

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    // Always 10 products
    const limit = 10;

    const skip = (page - 1) * limit;


    // =========================
    // GET PRODUCTS
    // =========================

    const products = await product_model
      .find()
      .skip(skip)
      .limit(limit)
      .lean();


    // =========================
    // TOTAL PRODUCTS
    // =========================

    const totalProducts =
      await product_model.countDocuments();


    const totalPages =
      Math.ceil(totalProducts / limit);


    // =========================
    // FORMAT PRODUCT
    // =========================

    const formattedProduct =
      products.map((prod) => {

        let image = null;


        // MongoDB Buffer image
        if (
          prod.image?.data &&
          prod.image?.contentType
        ) {

          image =
            `data:${prod.image.contentType};base64,` +
            Buffer.from(prod.image.data)
              .toString("base64");

        }


        // Online image
        else if (prod.imageUrl) {

          image = prod.imageUrl;

        }


        return {
          ...prod,
          image
        };

      });


    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      success: true,

      product: formattedProduct,

      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,

        hasNextPage:
          page < totalPages
      }

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Failed to fetch products",

      error: error.message

    });

  }
};






export const get_product_by_id_controle =  async(req,res) =>{
try {
  const { id } = req.params;

   if (!id) {

      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });

    }


    if (!mongoose.Types.ObjectId.isValid(id)) {

      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

    }

   const product = await product_model.findById(id);

 

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


      const prodcutobject =  product.toObject();

      if(product.image?.data && product.image?.contentType ){
          
        prodcutobject.image =  `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`;
      }
      else if(product.imageUrl){
        prodcutobject.image = product.imageUrl
      }
      else{
        prodcutobject.image = null
      }
      
    





   return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product : prodcutobject

    });

} catch (error) {
   console.error( "Get product by id error:", error );


    return res.status(500).json({
      success: false,
      message: "Internal server error",

    });

}


}

// product serch input 
export const product_search_by_input = async (req, res) => {
  try {
    const { text } = req.query;

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search text is required",
        data: [],
      });
    }

    const found = await product_model.find({
    $or:[
      {
         name: {
        $regex: text.trim(),
        $options: "i",
      },
      },
      {
        category: {
          $regex : text.trim(),
          $options :'i',
        }
      }
    ]
    });

    const formatproduct = found.map((item)=>{
      const productObject = item.toObject();

      if(item.image?.data && item.image?.contentType){
      productObject.image = `data:${item.image.contentType};base64,${item.image.data.toString("base64")}`;
         }
         
         else if(item.imageUrl){
          productObject.image =  item.imageUrl;
         }
         else{
          productObject.image = null
         }
         return productObject;
    })


    return res.status(200).json({
      success: true,
      message: found.length
        ? "Products found successfully"
        : "No products found",
      data:  formatproduct,
    });

  } catch (error) {
    console.error("Product search error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: [],
    });
  }
};

//  add to card *************************************************************************************************************

export const add_to_card_controller = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const userId = req.user.userId;


    /* =========================
       CHECK PRODUCT ID
    ========================= */

    if (!mongoose.Types.ObjectId.isValid(productId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

    }


    /* =========================
       CHECK PRODUCT
    ========================= */

    const product = await product_model.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    /* =========================
       FIND USER CART
    ========================= */

    let card = await addtocard_model.findOne({
      user: userId,
    });


    /* =========================
       CREATE NEW CART
    ========================= */

    if (!card) {

      card = await addtocard_model.create({

        user: userId,

        items: [
          {
            product: productId,
            quantity,
          },
        ],

      });

      return res.status(201).json({

        success: true,

        message: "Product added to cart",

        card,

      });

    }


    /* =========================
       CHECK EXISTING PRODUCT
    ========================= */

    const existingItem = card.items.find(
      (item) =>
        item.product.toString() === productId.toString()
    );


    /* =========================
       PRODUCT ALREADY IN CART
       → REMOVE PRODUCT
    ========================= */

    if (existingItem) {

      card.items = card.items.filter(
        (item) =>
          item.product.toString() !== productId.toString()
      );

      await card.save();

      return res.status(200).json({

        success: true,

        message: "Product removed from cart",

        card,

      });

    }


    /* =========================
       PRODUCT NOT IN CART
       → ADD PRODUCT
    ========================= */

    card.items.push({

      product: productId,

      quantity,

    });


    await card.save();


    return res.status(200).json({

      success: true,

      message: "Product added to cart",

      card,

    });


  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Something went wrong",

    });

  }

};

// get currrent add to card product  **************************************************************************

export const get_corrent_add_to_cart_controller = async (req, res) => {
  try {
    const userId = req.user.userId;

    const card = await addtocard_model
      .findOne({ user: userId })
      .populate("items.product");

    if (!card) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        card: {
          user: userId,
          items: [],
        },
      });
    }

    const formatProduct = card.items.map((item) => {
      let image = null;

      if (item.image?.data && item.image?.contentType) {
        image = `data:${item.image.contentType};base64,${Buffer.from(
          item.image.data
        ).toString("base64")}`;
      } else if (item.imageUrl) {
        image = item.imageUrl;
      } else if (item.product?.imageUrl) {
        image = item.product.imageUrl;
      }

      return {
        ...item.toObject(),
        image,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      card: {
        user: userId,
        items: formatProduct,
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};