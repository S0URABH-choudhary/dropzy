import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename:{type:String, required: true},
    uuid: { type: String, required: true },
    path:{type:String, required: true},
    size:{type:Number, required: true},
    sender:{type:String, required: false},
    receiver:{type:String, required: false},
},{timestamps:true}
);

fileSchema.index({ filename: 1 },{createdAT: 1},{ expireAfterSeconds: 24 * 60 * 60 });

export default mongoose.model("File",fileSchema);