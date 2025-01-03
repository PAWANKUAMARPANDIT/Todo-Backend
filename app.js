import express from "express";
import bodyParser from'body-parser';
import cookieParser from "cookie-parser";
import router from "./routes/todo.route.js";
import routes from "./routes/user.route.js";



const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/',router)
app.use('/api/v2/user/',routes)

export{app}
