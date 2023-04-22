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

adminRouter.post("/create", upload.array('hotel_images'), function (req, res) {
    
    let name = req.body.hotel_name,
    // slug = req.body.hotel_slug, 
    star_number = req.body.hotel_star_number, 
    // address = req.body.hotel_address,
    address =req.body.hotel_address + ", " + req.body.hotel_ward + ", " + req.body.hotel_district + ", " + req.body.hotel_province,
    // province = req.body.hotel_province, 
    images = [],
    // files = [],
    // price = req.body.hotel_price, 
    type = req.body.hotel_type;

    let i, available = 0;
    for(i=0; i < 6; i++){
        images[i] =  req.files[i].filename;
        // files[i] = req.files[i].path;
        console.log(images[i]);
        available = i + 1;
        if(req.files[available] == null){
            break;
        }
        // upload.array.length++;
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
        // price, 
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

    // console.log(hotel);
    res.redirect("/create");
});

module.exports = adminRouter;