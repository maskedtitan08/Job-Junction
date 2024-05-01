import express from "express";
import {isAuthorized} from "../middlewares/auth.js"
import { employerGetApplications , jobSeekerDeleteApplication,jobSeekerGetApplications ,postApplication} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/employer/getall",isAuthorized,employerGetApplications);
router.get("/jobseeker/getall",isAuthorized,jobSeekerGetApplications);
router.post("/post",isAuthorized,postApplication);
router.delete("/delete/:id",isAuthorized,jobSeekerDeleteApplication);   // id isliye pass kiya kyunki hme delete krne k chahiye bhi aur hmne req.params ka use bhi kiya id nikalne k liye


export default router;
