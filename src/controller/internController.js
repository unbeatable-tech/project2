const collegeModel = require('../models/collegeModel')

const validator = require('../validators/validator')
const { default: mongoose } = require("mongoose");



const createIntern=function(req,res){

      data=req.body;
      if(!validator.isValidRequestBody(data)){
       
          return res.status(400).send({status:false,msg:"send the data first"})
      }


      const{internMobile,internEmail,internName,internCollegeName}=data;

     
      if(!validator.isValid(internMobile)){
      return res.status(400).send({status:false,msg:"mobile no is missing"})
      }
     
      if(!validator.isValid(internEmail)){
         return res.status(400).send({status:false,msg:"email is missing"});
     }

     if(!validator.isValid(internName)){
         return res.status(400).send({status:false,msg:"college is missing"})
     }
   
     if(!validator.isValid(internCollegeName)){
        return res.status(400).send({status:false,msg:"name is missing"})
      }
 
      let collegeFetched=await collegeModel.findOne({name:internCollegeName})
    
      if(!collegeFetched){
          return res.status(400).send({status:false,msg:"invalid college name"})
      }
      
      let cid=collegeFetched._id;
      let intern=await internModel.findOne(cid)
      if(intern.email)
      {
          return res.status(400).send({status:false,msg:"email already exists"})
      }
      if(intern.mobile){
          return res.status(400).send({status:false,msg:"mobile already registred"})
      }
     
     let record=await internModle.create(data);
     if(record)
     res.status(200).send({status:true,data:record})