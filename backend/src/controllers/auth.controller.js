const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 *
 * @name registerUserController
 * @description register a new user ,expects username , email and password in the request
 * @access Public
 *
 */

const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  Check if user already exists
    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    //  Hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Interval Server error",
    });
  }
};

/**
 * @name loginUserController
 * @description login a user , expect email and password in the requiest body
 * @access public
 */

const loginUserController = async (req, res) => {
  try {
    console.log("LOGIN REQUEST BODY:", req.body);
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user =await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    //Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).js({
      message: "Internal server error",
    });
  }
};


/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */

const getMeController =  async (req, res)=>{
   try{
    const user = await  userModel.findById(req.user.id);
        res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

   }catch(error){
    console.error(error);
    res.status(500).json({
        message:"Internal server error"
    })
   }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
