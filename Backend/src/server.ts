import multer from "multer";
import app from "./app";
import {ExcelController} from './api/v1/controllers/ExcelController';


const port = process.env.PORT || 4000;



  
app.listen(port,()=>{
    // TODO:: we could use pino logger to log it
    console.log(`App is successfully initiated on port ${port}`);
});