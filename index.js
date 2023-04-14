// const express = require("express");
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// const hotelRoute = require("./src/routes/hotel.route");
// const authRouter = require("./src/routes/auth.router");
// const db = "mongodb+srv://thanhb1910296:b1910296@cluster0.dylbmxc.mongodb.net/?retryWrites=true&w=majority";

// app.use(express.json());
// app.use(hotelRoute);
// app.use(authRouter);

// mongoose.connect(db).then(() => {
//     console.log("Connection Successful");
// }).catch((e) => {
//     console.log(e);
// });


// app.listen(3000, "0.0.0.0", () => {
//     console.log(`Connected at port ${port}`);
// })

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// fs
const fs = require('fs');
// ejs
app.set('view engine', 'ejs');
// app.set("views", "./views/");
app.use(express.static('public'));


// cors
var corsOptions = {
  origin: "http://localhost:3000"
};
const cors = require("cors");
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// body parse
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//multer


// mongoose
const mongoose = require('mongoose');
const db = "mongodb+srv://thanhb1910296:b1910296@cluster0.dylbmxc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
 
// test
// app.get("/", function(req, res){
//     res.render("admin/index");
// }); 

// const hotelRoute = require("./src/routes/hotel.route");
// const authRouter = require("./src/routes/auth.router");
const adminRouter = require("./routes/admin.route");
const homeRouter = require("./routes/home.route");
// app.use(express.json());
// app.use(hotelRoute);
// app.use(authRouter);
app.use(adminRouter);
app.use(homeRouter);