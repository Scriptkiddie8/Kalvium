const bcrypt = require("bcrypt");

const users = [];

exports.signup = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((user) => user.email == email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Password must be same" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: hashedPassword,
  };

  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully..." });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = users.find((user) => user.email == email);

  if (!existingUser) {
    return res.status(401).json({ message: "User is not registerd" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return res.status(404).json({ message: "Password did not match" });
  }

  return res.status(201).json({ message: "User login successfully" });
};

module.exports = users;
