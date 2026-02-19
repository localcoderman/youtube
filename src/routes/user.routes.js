import { Router } from "express";
import { accessRefreshToken, changeCurrentPassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, registerUser, updateAccountDetail, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer_middleware.js";
import { loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    { name: "avatar", 
        maxCount: 1 },

    { name: "coverImage", 
        maxCount: 1 },
        
]), registerUser);

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshtoken").post(accessRefreshToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-details").patch(verifyJWT, updateAccountDetail)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
/* params se data fetch ho raha hai es liyay colon ka khiyal rkhna 
or us k baad wohi naam rkho jis se data ly rhy ho controllers mai */
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/user-wacthHistory").get(verifyJWT, getUserWatchHistory)

export default router;
