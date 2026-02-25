

import express from "express"
import {getDashboard} from "@/src/controller/dashboardController"
const router=express.Router()


router.get("/dashboard",getDashboard)

export default router