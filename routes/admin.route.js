const express = require("express");

const adminRouter = express.Router();

const User = require("../models/user");
const { Hotel } = require("../models/hotel");

const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
const upload = multer({ storage:storage });

adminRouter.get("/dashboard", async (req, res) => {
    res.render('admin/index', {
        page: "index"
    });
});

adminRouter.get("/create", async (req, res) => {
    res.render('admin/index', {
        page: "create"
    });
});

adminRouter.post("/create", upload.array('hotel_images', 12), function (req, res) {
    
    let name = req.body.hotel_name,
    // slug = req.body.hotel_slug, 
    star_number = req.body.hotel_star_number, 
    address = req.body.hotel_address, 
    // province = req.body.hotel_province, 
    images = [],
    //files = [],
    price = req.body.hotel_price, 
    type = req.body.hotel_type;

    for(i=0; i< upload.array.length; i++){
        images[i] =  req.files[i].filename;
        // files[i] = req.files[i].path;
        // console.log(images[i]);
        // console.log(files[i]);
    };
    
    let hotel = new Hotel({
        name, 
        // slug, 
        star_number, 
        address, 
        // province, 
        images,
        // files,
        price, 
        type,
    });

    hotel.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Save successfully !");
            console.log(hotel);
        }
    });

    res.redirect("/create");
});

module.exports = adminRouter;