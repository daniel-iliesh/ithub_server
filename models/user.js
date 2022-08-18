import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: { type:String },
    username: {type:String, required:true},
    name: { type:String, required:true }, 
    email: { type:String, required:true }, 
    bio: { type:String },
    imageUrl: { type:String }, 
    password: { type:String, required:true },
    friends: {type: [String]},
    createdAt: {
        type: Date, 
        default: new Date()
    },
    work: {
        title: {type: String}, 
        company: {type: String},
        beginDate: {type: Date},
        finishDate: {type: Date},
        location: { type:String },
        skills: {type: [String]}
    }, 
    studies: {
        school: {type: String},
        field: {type: String},
        location: {type: String},
        beginDate: {type: Date},
        finishDate: {type: Date}
    }, 
    preferences: {
        musicgenre: { type: [String] },
        musicbest: { type: [String] },
        mooviesgenre: { type: [String] },
        mooviesbest: { type: [String] },
        gamesgenre: { type: [String] },
        gamesbest: { type: [String] }
        
    }
});

export default mongoose.model('users', userSchema);
