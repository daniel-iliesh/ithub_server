import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  pname: {type: String, required : true}, 
  image: {type: String}, 
  description: {type: String, required : true},
  creator: {type: String, required : true},
  contributors: {type: [String]},
  tags: {type: [String]},
  blogposts: {type: [String]}
})

export default mongoose.model("projects", projectSchema);

