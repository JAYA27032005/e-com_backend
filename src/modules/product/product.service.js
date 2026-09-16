const { uploadToCloudinary } = require("../../utils/uploadToCloudinary")

const search = async()=>{

}
const getSingle = async()=>{
    
}


const getAllSeller = async()=>{
    
const allSellerData = await ProductModel

}  




const update = async()=>{
    
}

//=============deleteOne 
const deleteSingle = async (product) => {

    await product.deleteOne();
    await Promise.all(product.images.map((img) => destroyFromCloudinary(img.publicId)));
    return product;
};

const updateStatus = async (product,payload) => {
    product.isActive = payload.isActive;
    await product.save();
    return product;

};

const getAllAdmin = async()=>{
    
}
const create = async(sellerId , payload , files=[])=>{
    if(payload.price> payload.mrp){
        throw apiError(400,"price can not be more than MRP");
    }
    if(files.length === 0){
        throw apiError(400,"add at least one image");
}    

const images = await Promise.all(files.map((file)=>{
    uploadToCloudinary(file.buffer,"ecom/product")}))

    payload.images = images;
    payload.seller = sellerId;
}

const buildFilter = async (query) => {
    const filter = { isActive: true };																	//	ALWAYS	start	here
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    if (query.category) {
        const category = await CategoryModel.findOne({ slug: query.category });
        if (category) {
            /*	If	it	is	a	TOP-LEVEL	category,	the	products	hang	off	its	CHILDREN	
                        so	match	the	parent	OR	any	of	its	children.	*/
            const children = await CategoryModel.find({ parent: category._id }).select('_id');
            filter.category = { $in: [category._id, ...children.map((c) => c._id)] };
        }
    }
    if (query.brand) {
        const brand = await BrandModel.findOne({ slug: query.brand });
        if (brand) filter.brand = brand._id;
    }
    const min = Number(query.minPrice);
    const max = Number(query.maxPrice);
    if (Number.isFinite(min) || Number.isFinite(max)) {
        filter.price = {
            ...(Number.isFinite(min) && { $gte: min }),
            ...(Number.isFinite(max) && { $lte: max }),
        };
    }
    return filter;
};

// get all product filter 
const getAllProductsFilter = async (query) => {
    const filter = await buildFilter(query);
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(24, Number(query.limit) || 12);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        ProductModel.find(filter)
            .populate('category', 'name	slug')
            .populate('brand', 'name	slug')
            .populate('seller', 'name	shopName')
            .sort({ title: 1 })
            .skip(skip)
            .limit(limit),
        ProductModel.countDocuments(filter),
    ]);
    return { products, page, pages: Math.ceil(total / limit) || 1, total };

};


module.exports = {
    serach,
    getSingle,
    getAllSeller,
    update,
    deleteSingle,
    updateStatus,
    getAllAdmin,
    create,
    buildFilter,
    getAllProductsFilter
}