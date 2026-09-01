const { uploadToCloudinary } = require("../../utils/uploadToCloudinary")

const search = async()=>{

}
const getSingle = async()=>{
    
}
const getAllSeller = async()=>{
    
}
const update = async()=>{
    
}
const deleteSingle = async()=>{
    
}
const updateStatus= async()=>{
    
}
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

const getAllProductsFilter = async()=>{
    
}

module.exports = {
    serach,
    getSingle,
    getAllSeller,
    update,
    deleteSingle,
    updateStatus,
    getAllAdmin,
    create,
    getAllProductsFilter
}