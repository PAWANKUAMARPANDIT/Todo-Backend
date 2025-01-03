import {Router} from "express";
import { logIn, signIn } from "../controller/user.controller.js";

const routes = Router();

//signIn routes
routes.post('/signIn',signIn);


//login routes
routes.post('/logIn',logIn);


export default routes;