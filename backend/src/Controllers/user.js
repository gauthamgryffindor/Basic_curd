import UserModel from "../Modals/user.js"
import Auth from "../Helper/Auth.js"

const createUser=async(req,res)=>{
//try{
const user= await UserModel.findOne({email:req.body.email})
if(!user){
req.body.password= await Auth.createHash(req.body.password)
let newUser = await UserModel.create(req.body)
res.status(201).send(`Successfully Created ${req.body.email} ${typeof newUser}`)
}
else
  {
 res.status(402).send({
                    message:`User with ${req.body.email} already exists`
                })
            }   
// }catch(err){
//     res.status(500).send({msg:"Internal sever error"})
// }
} 

const getAllUsers=async(req,res)=>{
    try{
    const user= await UserModel.find({},{password:0})
    res.status(200).send(user)
}
catch(err){
    res.status(500).send({msg:"Internal sever error"})
}

}
const getUserById=async(req,res)=>{
    try{
    const user= await UserModel.findById({_id:req.params.id},{password:0})
    if(user){
    res.status(200).send(user)
    }
    else{
        res.status(400).send({msg:"user doesn't exsist"})
    }
}
catch(err){
    res.status(500).send({msg:"Internal sever error"})
}
}
const login = async(req,res)=>{
try {
const user= await UserModel.findOne({email:req.body.email})
if(user){
    if( await Auth.hashCompare(req.body.password,user.password)){
        let token=await Auth.createToken({
            name:user.name,
            email:user.email,
            role:user.role
        })
        res.status(200).send({msg:`login successfully Created ${req.body.email} `,token})
    }else{
        res.status(400).send(`password incorrect`)
    }

}
else
  {
 res.status(400).send({
                    message:`User with ${req.body.email} doe not exist exists`
                })
            }  
} catch (error) {
    res.status(500).send({message:"internal server error"})
}
}
export default{
    createUser,
    getAllUsers,
    login,
    getUserById
}