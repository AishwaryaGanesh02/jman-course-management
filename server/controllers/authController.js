const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET;

// Controller for handling user authentication, including registration and login.
const authController = {
  // Registers a new user after validating their information and hashing their password.
  register: async (req, res) => {
    const { username, email, password, designationId, gender, phoneNumber } =
      req.body;

    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await UserModel.createUser({
        username,
        email,
        passwordHash: hashedPassword,
        designationId: Number(designationId),
        gender,
        phoneNumber,
        role: req.body.role ? req.body.role : "employee",
      });
      res.status(201).json({ message: "Successfully Registered" });
    } catch (error) {
      res.status(500).json({ error: "User creation failed" });
    }
  },

  // Authenticates a user by validating their credentials and generating a JWT token.
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "5h" }
    );
    res.json({
      token,
      userid: user.id,
      role: user.role,
      degnid: user.designationId,
    });
  },
};

module.exports = authController;
