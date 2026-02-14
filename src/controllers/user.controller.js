import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get user detail from frontend
// validate the data
// check if user already exist
// if exist throw error
// Check for image or avatar
// upload them to cloudinary
// create user object || create entry in DB
// remove password and send refresh token and access token to frontend
// check for user creation
// return response to frontend

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError("400", "All Fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{email}, {username}],
  });

  if (existedUser) {
    throw new ApiError(400, "user already exist");
  }

  const avatarLoacalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLoacalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLoacalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError("400","Avatar does no exist")
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

 const createdUser =  await User.findById(user._id).select(
  "-password -refreshToken"
 )
if(!createdUser){
  throw new ApiError(500,"User are no created")
}

return res.status(201).json(
  new ApiResponse(200,createdUser,"User Registered Successfully")
)

});

export { registerUser };
