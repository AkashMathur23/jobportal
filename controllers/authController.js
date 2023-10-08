import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  //   try {
  const { name, lastName, email, password } = req.body; //destructuring body data whatever we're getting as required.
  //validate
  if (!name) {
    next("name is required");
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "please provide name" });
  }
  if (!lastName) {
    next("lastName is required");
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "please provide name" });
  }

  if (!email) {
    next("email is required");
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "please provide email" });
  }
  if (!password) {
    next("password is required at least or more than 6 character");
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "please provide password" });
  }

  //if we get different user from same email
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Register Please login");
    //   return res.status(200).send({
    //     success: false,
    //     message: "Email Already Register Please login",
    //   });
  }
  //after validating all the upper conditions
  const user = await userModel.create({ name, email, password, lastName });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
  //   } catch (error) {
  //     next(error);
  //     // console.log(error);
  //     // res.status(400).send({
  //     //   message: "Error In Register Controller",
  //     //   success: false,
  //     //   error,
  //     // });
  //   }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Field");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password"); //using + here to hide password
  if (!user) {
    next("Invalid UserName or password");
  }

  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username or password ");
  }
  user.password = undefined; // make password undefined to make it more secure
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "login successfully",
    user,
    token,
  });
};
