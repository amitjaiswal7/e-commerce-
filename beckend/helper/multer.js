import multer from "multer";

export const multer_helper = multer({
    storage: multer.memoryStorage(),
    limits :{
        fileSize : 2 * 1024 * 1024
    }
}) 