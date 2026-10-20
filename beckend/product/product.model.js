import  mongoose from 'mongoose';


const p_model = mongoose.Schema({
    name:{
        type:String,
        require:true
    }, 
    description:{
        type:String,
        require:true
    },
    image:{
     data: Buffer,
    contentType: String
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },

    price:{
        type:Number,
      
    },
     discount:{
       type:Number,
        
     }, category:{
         type:String,

     },
    brand:{
        type:String,
      

    }
})

const product_model = mongoose.model('product',p_model);


export default product_model;