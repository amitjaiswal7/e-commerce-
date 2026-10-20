import {z} from "zod"
const addtocard_middleware = ({ zod_model }) => {

  return (req, res, next) => {

    const response = zod_model.safeParse(req.body);

    if (!response.success) {

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: response.error.flatten().fieldErrors,
      });

    }

    req.body = response.data;

    next();
  };
};

export default addtocard_middleware;