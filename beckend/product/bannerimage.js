import { Image_model } from "./bannerimage.model.js"

export const banner_get = async (req, res) => {
  try {

    const response = await Image_model.find().limit(4);

    if (response.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Banner images not found"
      });
    }

    const banner = response.map((item) => {

      const base64Image = item.image.data.toString("base64");

      return {
        id: item._id,
        image: base64Image,
        contentType: item.image.contentType
      };

    });

    return res.status(200).json({
      success: true,
      response: banner
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};