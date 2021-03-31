const exp=require("express");
const adminApiObj=exp.Router();

const asyncHandler=require("express-async-handler")

//extract body of req obj
adminApiObj.use(exp.json());

//import bcrypt
const bcryptjs=require("bcryptjs");

const jwt=require("jsonwebtoken")


//import cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer=require("multer")



//configure cloudinary
cloudinary.config({
    cloud_name: 'diqtn7ozg',
    api_key: '512249956943975',
    api_secret: 'k2WkjpyCn8toi2WNROdsbNoA3U8'
});


//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'E-Commerce',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });









//post req handler for user register
adminApiObj.post("/addproduct",upload.single('photo'), asyncHandler(async(req,res,next)=>{
    //console.log("the user is ",req.body)
    //get user collection object
    let productCollectionObj = req.app.get("productCollectionObj");
    
    
    let productObj =  JSON.parse(req.body.productObj)
    
    //console.log("user object is",productObj);
    //check for user in db
    let product = await productCollectionObj.findOne({productname:productObj.productname});

    //if username alreaddy taken
    if(product!==null){
        res.send({message:"product existed"});
    }
    else{
        
        //add userImagelink
        productObj.productImgLink = req.file.path;

        //create product
        let success=await productCollectionObj.insertOne(productObj);
        res.send({message:"product added"})
        console.log("product added")
        
    }
   //console.log("user obj is",req.body);
}))

//get all products
adminApiObj.get("/allproducts",asyncHandler(async(req,res,next)=>{

    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    let products = await adminProductCollectionObj.find().toArray();
    //console.log("products are",products)
    res.send({message:products})
}))

//get one products
adminApiObj.get("/oneproduct/:pCategory",asyncHandler(async(req,res,next)=>{
    
    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    //console.log(adminProductCollectionObj)
    let products = await adminProductCollectionObj.find({pCategory :req.params.pCategory}).toArray();
    //console.log("products are",products)

    res.send({message:products})
}))

adminApiObj.post("/viewitem",asyncHandler(async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj");
    //console.log("In ViewItem ",req.body)
    let Obj=req.body;
    let viewItem=await productCollectionObj.findOne({productname:Obj.productname});
    if(viewItem!==null){
        //create a token
        let token = await jwt.sign({productname:viewItem.productname},"abcd",{expiresIn:10});

        //send token
        res.send({message:true,signedToken:token,productname:viewItem.productname});
    }
    
}))

//edit product details
adminApiObj.post("/editproduct",asyncHandler(async(req,res,next)=>{

    let productCollectionObj = req.app.get("productCollectionObj");
    let productObj =  req.body;
    
    //console.log("user object is",productObj);
    //check for user in db
    let product = await productCollectionObj.findOne({productname:productObj.productname});

    //if username alreaddy taken
    if(product!==null){
        let edit=await productCollectionObj.updateOne({productname:productObj.productname},{$set:{
            productID:edit.productID,
            colour:edit.colour,
            mfddate:edit.mfddate,
            cost:edit.cost
        }});
        res.send({message:true});
    }

}))

//delete from all products
adminApiObj.post("/delete",asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    let productObj =  req.body;
    
    //console.log("user object is",productObj);
    //check for user in db
    let product = await productCollectionObj.findOne({productname:productObj.productname});

    //if username alreaddy taken
    if(product!==null){
        let remove=await productCollectionObj.deleteOne({productname:productObj.productname});
        res.send({message:true});
    }

}))
//export
module.exports = adminApiObj;