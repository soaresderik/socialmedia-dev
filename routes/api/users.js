const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validationRegisterInput = require("../../validation/register");
const validationLoginInput = require("../../validation/login");

// Load user Model
const User = require("../../models/User");

// @route GET api/users/test
// @desc  Rota de teste
// @access Publica
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route POST api/users/register
// @desc  Registra Usuário
// @access Publica
router.post("/register", (req, res) => {
  const { errors, isValid } = validationRegisterInput(req.body);

  // Validação
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/register
// @desc  Registra Usuário
// @access Publica
router.post("/login", (req, res) => {
  const { errors, isValid } = validationLoginInput(req.body);
  // Validação
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Usuário não encontrado";
      res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(payload, key.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Senha Incorreta";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  POST api/users/register
// @desc   Retorna Usuário atual
// @access Privado
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
