const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register1",async(req,res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,work,add,desc,dummyData} = req.body;
    // let dummyData=[[{key: 0, course: 'MTH101A', grade: 'C', credits: 11, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 1, course: 'PHY101A', grade: 'C', credits: 3, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 2, course: 'PHY102A', grade: 'C', credits: 11, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 3, course: 'LIF101A', grade: 'C', credits: 6, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 4, course: 'ENG124A', grade: 'C', credits: 11, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 5, course: 'TA101A', grade: 'C', credits: 9, credits_received: 6.6,is_repeated:false,is_sx:false}],
    //                 [{key: 6, course: 'MTH102A', grade: 'C', credits: 11, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 7, course: 'PHY103A', grade: 'C', credits: 11, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 8, course: 'ESC101A', grade: 'C', credits: 14, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 9, course: 'CHM102A', grade: 'C', credits: 8, credits_received: 6.6,is_repeated:false,is_sx:false},
    //                 {key: 10, course: 'CHM101A', grade: 'C', credits: 3, credits_received: 6.6,is_repeated:false,is_sx:false}]];


    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc,dummyData
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser,"adduser");
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id,"id");

        // const updateduser = await users.findByIdAndUpdate(id,req.body,{
        //     new:true
        // });
        const updateduser = await users.findOneAndUpdate({"_id":{$gte:id}},{$set:req.body})

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;










