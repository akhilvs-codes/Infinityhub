
import mongoose from "mongoose";

const recodeSchema=new mongoose.Schema({

    status:{
        type:String,
        required:true,
        enum:["Active","Inative","Pending"]
    },
    category:String
},
    {timestamps:true}
)


recodeSchema.index({status:1,createdAt:-1})
recodeSchema.index({category:1,createdAt:-1})


const RecodeModel=mongoose.model("record",recodeSchema)

export default RecodeModel