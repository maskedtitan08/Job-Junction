import express from "express";
import { register ,login , logout ,getUser } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized,logout); // logout krne se phle check krega ki jo user hai uske pss cookie/token hai ya nhi kyunki isAuthorized function check krta hai ki user k pss token hai ki nhi
router.get("/getuser",isAuthorized,getUser);

export default router;
