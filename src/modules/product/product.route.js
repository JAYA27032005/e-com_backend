const express = require('express');
const productRouter = express.Router();
const productController = require("./product.controller");
const { uploadMedia } = require('../../middlewares/upload.middleware');

productRouter.post("/",productController.createproduct);


productRouter.get("/",productController.getAllProductListFilter);


productRouter.get("/search",productController.searchProduct);


productRouter.get("/:slug",productController.Route.getSingleProduct);




productRouter.use(validationMiddleware)

productRouter.get("/seller/mine",productController.getAllSellerProduct);

productRouter.patch("/:id",loadResource(ProductModel),productController.updateProduct);

// delete a[pis]
productRouter.delete("/:id",loadResource(ProductModel),productController.deleteProduct);

// admin apis
productRouter.post("/:id",productController,updateProductStatus);
productRouter.post("/admin/all",productController.createproduct);
productRouter.post("/",uploadMedia("image",3));





module.exports = productRouter;
