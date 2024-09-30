const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { register, login };
