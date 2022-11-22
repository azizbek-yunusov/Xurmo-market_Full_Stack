const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication" });

      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     res.status(402).json({ error: "You must be logged in" });
//   }
//   const token = authorization.replace("Aziz ", "");
//   jwt.verify(token, JWT_SECRET, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "You should logged in profile" });
//     }

//     const { _id } = payload;
//     UserModel.findById(_id).then((userData) => {
//       req.user = userData;
//       next();
//     });
//   });
// };
