const exp=require("express");
const adminApiObj=exp.Router();
const errorHandler=require("express-async-handler");
const { ErrorHandler } = require("@angular/core");
//import 
const verifyToken=require("./middlewares/verifyToken")

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
//configure cloudinary
cloudinary.config({
    cloud_name: 'dtrhafbol',
    api_key: '471847945156575',
    api_secret: 'H7vKMedZ5nAeWlIjbjtNebdk3OY'
});
//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'adminproduct',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});
//congigure multer
var upload = multer({ storage: storage });
//extract body of req obj
adminApiObj.use(exp.json())

adminApiObj.get("/allproducts",errorHandler(async(req,res,next)=>{

    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    let products = await adminProductCollectionObj.find().toArray();
    //console.log("products are",products)
    res.send({message:products})
}))


//view cart

adminApiObj.post("/viewitem",errorHandler(async(req,res,next)=>{
    let adminProductCollectionObj=req.app.get("adminProductCollectionObj");
    //console.log("In ViewItem ",req.body)
    let Obj=req.body;
    let viewItem=await adminProductCollectionObj.findOne({pname:Obj.pname});
    if(viewItem!==null){
        //create a token
        let token = await jwt.sign({pname:viewItem.pname},"abcd",{expiresIn:10});

        //send token
        res.send({message:true,signedToken:token,pname:viewItem.pname});
    }
    
}))
//get one item
adminApiObj.get("/getitem/:pname",errorHandler(async(req,res,next)=>{
    
    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    //console.log(adminProductCollectionObj)
    let products = await adminProductCollectionObj.find({pname :req.params.pname}).toArray();
    console.log("products are",products)
    
    res.send({message:products})
}))

//get one products
adminApiObj.get("/oneproduct/:pCategory",errorHandler(async(req,res,next)=>{
    
    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    //console.log(adminProductCollectionObj)
    let products = await adminProductCollectionObj.find({pCategory :req.params.pCategory}).toArray();
    //console.log("products are",products)
    
    res.send({message:products})
}))


adminApiObj.post("/productdetails",upload.single('photo'),errorHandler(async (req,res,next)=>{
    console.log("url is ",req.file.path);
    //get product collectionobject

    let adminProductCollectionObj=req.app.get("adminProductCollectionObj");
   console.log("product details obj is",req.body)
   let proObj=JSON.parse(req.body.proObj);
    //add Imagelink
    proObj.ImgLink = req.file.path;
let success=await adminProductCollectionObj.insertOne(proObj)
        res.send({message:"product created"})

    
}))
adminApiObj.get("/getlist",errorHandler(async (req,res,next)=>{
    let adminProductCollectionObj = req.app.get("adminProductCollectionObj") 
  
    let proObj=await adminProductCollectionObj.find().toArray();
    console.log("list is",proObj);

    res.send({message:"success",list:proObj})
    
    }))
adminApiObj.post("/delete",errorHandler(async(req,res,next)=>{
    
        let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
        let productObj =  req.body;
        
        console.log("product object is",productObj);
        //check for product in db
        let product = await adminProductCollectionObj.findOne({pname:productObj.pname});
    
        if(product!==null){
            let remove=await adminProductCollectionObj.deleteOne({pname:productObj.pname});
            res.send({message:true});
        }
    
    }))



























module.exports=adminApiObj;