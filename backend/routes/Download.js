import { Router } from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";
import File from "../models/filemodle.js"

const router = new Router();
const __dirname = dirname(fileURLToPath(import.meta.url))

router.get("/:uuid",async(req,res)=>{
    const file = await File.findOne({uuid: req.params.uuid});
    if(!file){
        return res.render('download', {error : " link has been expired"});

    }
    const filepath = `${file.path}`;
    res.download(filepath);
});

export default router;