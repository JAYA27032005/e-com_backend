const { apiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { OK } = require("../../utils/httpStatus");
const productService = require("../../modules/product/product.service");

const searchProducts = asyncHandler(async(req,res)=>{
    const result = await ProductService.serch();
    res.status(OK).json(apiResponse(OK,result,"fetch  search product successfully"))
});
const getSingleProduct = asyncHandler(async(req,res)=>{
      const result = await ProductService.getSingleProduct();
    res.status(OK).json(apiResponse(OK,result,"fetch  search product successfully"))
})

const getAllSellerProduct = asyncHandler(async(req,res)=>{
      const result = await ProductService.getAllSeller(req.user._id);
    res.status(OK).json(apiResponse(OK,result,"fetch all seller product successfully"))
})
const getAllProductListFilter = asyncHandler(async(req,res)=>{
      const result = await ProductService.getAllProductsFilter();
    res.status(OK).json(apiResponse(OK,result,"fetch  search product successfully"))
})

const updateProduct = asyncHandler(async(req,res)=>{
      const result = await ProductService.update();
    res.status(OK).json(apiResponse(OK,result," single product updated  successfully"))
})
const deleteProduct = asyncHandler(async(req,res)=>{
      const result = await ProductService.delete();
    res.status(OK).json(apiResponse(OK,result,"single product deleted successfully"))
})
-D swagger-autogen
swagger-ui-express
const updateProductStatus = asyncHandler(async(req,res)=>{
      const result = await ProductService.updateStatus();
    res.status(OK).json(apiResponse(OK,result,"product status updated successfully"))
})
const getAllProductAdmin = asyncHandler(async(req,res)=>{
      const result = await ProductService.getAllAdmin();
    res.status(OK).json(apiResponse(OK,result,"all admin fetched successfully"))
})

///craete productt
const createProduct = asyncHandler(async(req,res)=>{
      const result = await ProductService.create(req.user._id,req.body,req.file);
    res.status(OK).json(apiResponse(OK,result,"product created successfully"))
})

module.exports = {
    searchProducts,
    getAllSellerProduct,
    getSingleProduct,
    getAllProductListFilter,
    updateProduct,
    deleteProduct,
    updateProductStatus,
    getAllProductAdmin,
    createProduct,
}