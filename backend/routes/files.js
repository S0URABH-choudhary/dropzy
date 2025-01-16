import express from "express";
import File from "../models/filemodle.js";
import dotenv from "dotenv"
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"
dotenv.config();

const router = express.Router();


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve("uploads")),
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniquename);
    }
})

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 },
}).single('file');

router.post("/", (req, res) => {
    // store file
    upload(req, res, async (err) => {
        // validate request
        if (!req.file) {
            return res.status(400).json({ error: "No file received. Please upload a file." });
        }
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: `Multer error: ${err.message}` });
        }        
       
        // store file in database
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        // response
        return res.json({ file: `${process.env.BASE_APP_URL}/files/${response.uuid}` });
    });
});

export default router;