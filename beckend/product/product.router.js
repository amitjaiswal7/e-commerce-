import express from 'express';
import { product_get } from './product.controller.js';
import { banner_get } from './bannerimage.js';
import { get_product_by_id_controle } from './product.controller.js';
import { product_search_by_input } from './product.controller.js';
import { login_midleware } from '../milldeware/login.midleware.js';
import addtocard_middleware from '../milldeware/addtocard.middleware.js';
import { card_validation } from '../validation/card.validation.js';
import { add_to_card_controller } from './product.controller.js';
import { get_corrent_add_to_cart_controller } from './product.controller.js';
import { user_detail_controller } from './product.controller2.js';
import { user_detail_update_controller } from './product.controller2.js';
import { multer_helper } from '../helper/multer.js';
const product_router = express.Router();



product_router.get('/product',product_get );
product_router.get('/banner-image', banner_get);
product_router.get('/prodcutdetail/:id', get_product_by_id_controle)
product_router.get('/product-search-input', product_search_by_input)
product_router.post('/add-to-card', login_midleware ,addtocard_middleware({ zod_model: card_validation}),  add_to_card_controller)
product_router.get('/add-to-card-current', login_midleware, get_corrent_add_to_cart_controller);
product_router.get('/user-detail', login_midleware, user_detail_controller)
product_router.patch('/user-detail-update',login_midleware, multer_helper.single("image") , user_detail_update_controller)



export default product_router;