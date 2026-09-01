const apiError = require("../utils/apiError");
const multer = require("multer")

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];
const VIDEO_TYPES = ['video/mp4'];

const fileFilter = (_req, file, cb) => {

  console.log("line 17 filter file",file);
  if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(file.mimetype)) return cb(null, true);
  cb(apiError(400, 'Only jpeg, png, webp or mp4 files are allowed'));
};

 const createUploader = ({ maxSizeMb = 2 } = {}) =>
  multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
  });

// Categories, brands, banners, return photos: one small image.
 const upload = createUploader({ maxSizeMb: 5 });

// Products: up to five images plus a short clip, so a bigger ceiling.
 const uploadMedia = createUploader({ maxSizeMb: 10 });
               
module.exports = {upload,uploadMedia,createUploader }