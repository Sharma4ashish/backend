import { Schema,Model, Aggregate } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema ({
    videoFile:{
        type:String,
        required:true,
        
    },
    title:{
        type: String,
        required:true,
    },
    thumnbnail:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
        required:true,
    },
    views:{
        type: Number,
        // ref: "User",
        required:true,
    },
    isPublished:{
        type: Boolean,
        default:true,
    },
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    watchHistory:{
        type:String,

    }

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

const Video = Model("Video", videoSchema )

export {Video}