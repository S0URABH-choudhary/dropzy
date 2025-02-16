import { Router } from "express"
import File from "../models/filemodle.js"

const router = new Router();

router.get("/:uuid",async(req,res)=>{
    const file = await File.findOne({uuid: req.params.uuid});
    if(!file){
        return res.render('download', {error : " link has been expired"});

    }
    const filepath = `${file.path}`;
    res.download(filepath);
});

export default router;