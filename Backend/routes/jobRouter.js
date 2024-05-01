import express from "express";
import {getAllJobs,postJob,getmyJobs,updateJob,deleteJob, getSingleJob} from  "../controllers/jobController.js"
import {isAuthorized}  from "../middlewares/auth.js"

const router = express.Router();
router.get("/getall",getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/myJobs", isAuthorized , getmyJobs);
router.put("/update/:id",isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);  // id isliye pss kr rhe hain kyunki hme delete aur update krne k liye id ke through find keni pdegi isliye
router.get("/:id",isAuthorized,getSingleJob)

export default router;
