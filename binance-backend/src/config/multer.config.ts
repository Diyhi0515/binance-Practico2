import { diskStorage } from "multer";
import { extname, join } from "path";
import { Request } from "express";
import * as fs from "fs";

const storage = diskStorage({
    destination(_: Request, __: Express.Multer.File, cb) {
        const uploadPath = join(__dirname, "..", "..", "public", "uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename(_: Request, file: Express.Multer.File, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = extname(file.originalname);
        const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, fileName);
    },
});

export default storage;
