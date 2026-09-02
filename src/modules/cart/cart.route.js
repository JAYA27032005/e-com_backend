const express = require('express');
const validattionMiddleware = require('../../middlewares/authenticate.middleware');
const cartController = require('./cart.controller');
const CartRouter = express.Router();

CartRouter.use(validattionMiddleware);


CartRouter.get('/', cartController.get);
CartRouter.post('/', cartController.add);
CartRouter.patch('/:productId', cartController.updateQty);
CartRouter.delete('/:productId', cartController.remove);
CartRouter.delete('/', cartController.clear);



module.exports = CartRouter;