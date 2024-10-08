// This project is basically the creation of an RESTFUL API.
const express=require("express");
const app=express();
const users=require("./rawdata.json");
const fs=require("fs");
const port=8000;
// use middleware plugin.
app.use(express.urlencoded({extended:false}));
// for the get requests.
app.get("/users",(req,res)=>{
   return  res.json(users);
});
app.route("/users/:id")
.get((req,res)=>{
   const id=Number(req.params.id);
   const user=users.find((user)=>user.id===id);
   return res.json(user);
})
.patch((req,res)=>{
   const id=Number(req.params.id);
   const user=users.find((user)=>user.id===id);
   if (!user) {
      return res.status(404).json({ status: "User not found" });
   }
   const updates = req.body;

   // Update the fields based on the request body
   Object.keys(updates).forEach((key) => {
      if (user.hasOwnProperty(key)) {
         user[key] = updates[key]; // Update only the specified fields
      }
   });
   fs.writeFile("./rawdata.json",JSON.stringify(users),(err,data)=>{
      res.json({status:"Data updated succesfully"});
   })
})
.delete((req,res)=>{
   const id=Number(req.params.id);
   Newusers=users.filter((user)=>user.id!==id);
   fs.writeFile("./rawdata.json",JSON.stringify(Newusers),(err,data)=>{
      res.json({status:"Data have been deleted succesfully"});
   })
})
app.post("/users/",(req,res)=>{
   const body=req.body;
   users.push({...body,id:users.length+1});
   fs.writeFile("./rawdata.json",JSON.stringify(users),(err,data)=>{
      res.json({status:"Data corresponding to the id "+users.length+" have been added succesfully"});
      console.log(body);
   })
})
app.listen(port,()=>console.log("Server started successfully"));



