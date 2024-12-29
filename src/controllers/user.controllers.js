import { asyncFuncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const userRegister = asyncFuncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already existed
  // check for images avatar
  // upload the images to clodinary
  // create user object - enrty in db
  // remove password and create refresh and access token
  // check for user creation
  // return res

  const { username, fullname, email, password } = req.body;
  // console.log(username);

  if (
    [username, email, fullname, password].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "All Field Are Requiered ");
  }

  const exitedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // console.log(req.files);

  const coverImageLoacalFilePath = "";
  if (req.files.coverImage) {
    coverImageLoacalFilePath = req.files?.coverImage[0]?.path;
  }

  const avatarLoacalFilePath = req.files?.avatar[0]?.path;

  if (!avatarLoacalFilePath) {
    throw new ApiError(400, "avatarLoacalFilePath is required");
  }

  const avatar = await uploadOnCloudinary(avatarLoacalFilePath);
  const coverImage = await uploadOnCloudinary(coverImageLoacalFilePath);

  if (!avatar) {
    throw new ApiError(400, "avatar file requiered");
  }

  const user = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    coverImage: coverImage?.url || "",
    avatar: avatar.url,
  });

  const createdUser = await User.findById(user._id).select(
    " -password -accessToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went Wrong While creating user");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdUser,
      },
      "User Created Succesfully"
    )
  );
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const userAccessToken = await user.generateAccessToken();
    const userRefreshToken = await user.generateAccessToken();
    user.refreshToken = userRefreshToken;
    await user.save({ validateBeforeSave: false });

    return { userAccessToken, userRefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somethhing Went Wrong While Generting Access and Referesh Token while "
    );
  }
};

const userLogin = asyncFuncHandler(async (req, res) => {
  // req Body Data
  // Check all Fields are there
  // check User exists with this email or username
  // check password
  // create jwt tokens
  // send cookeis to browser
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or Email Required");
  }
  const user = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User Does Not Exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }
  const { userAccessToken, userRefreshToken } =
    await generateAccessAndRefreshToken(user_id);

  const loggeninUser = User.findById(user_id).select("-passwors -refreshToken");

  const cookieOption = {
    maxAge: 90000,
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookies("accessToken", userAccessToken, Option)
    .cookies("refreshToken", userRefreshToken, Option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggeninUser,
          userAccessToken,
          userRefreshToken,
        },
        "User Logged in Succesfully"
      )
    );
});

const logOutUser = asyncFuncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user?._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const cookieOption = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie(accessToken, cookieOption)
    .clearCookie(refreshToken, cookieOption)
    .json(new ApiResponse(200, {}, "user Logged out "));
});

const refreshingAccessToken = asyncFuncHandler((req, res) => {});

export { userRegister, logOutUser, userLogin };
