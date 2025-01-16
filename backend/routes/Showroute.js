import express from "express";
import File from "../models/filemodle.js";
import dotenv from "dotenv"

dotenv.config();

const router = express.Router();



router.get("/:uuid", async(req,res)=>{
    try{
        const file = await File.findOne({uuid: req.params.uuid});
        if (!file){
            return res.render("download", { error: "File not found", uuid: null, filename: null, filesize: null, download: null });
        }
        return res.render("download",{
            uuid: file.uuid,
            filename: file.filename,
            filesize: file.size,
            download: `download/${file.uuid}`
        });

    }catch(error){
        console.error(error);
        return res.render("download", { error: "Something went wrong" });
    }
    
})


export default router;