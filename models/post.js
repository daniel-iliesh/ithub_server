import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    description: {type: String},
    name: {type: String},
    creator: {type: String}, 
    creatorImg: {type: String},
    tags: {type: [String]}, 
    selectedFile: {type: String}, 
    likes: {
        type:[String], 
        default:[]
    },
    createdAt: {
        type: Date, 
        default: new Date()
    },
});

export default mongoose.model('posts', postSchema);