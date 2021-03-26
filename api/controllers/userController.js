const { User } = require("../models");
const userFindAndPopulate = require("../utils/userFindAndPopulate");

const userController = {};

userController.getUser = (req, res, next) => {
  const id = req.body.id || req.user._id;
  userFindAndPopulate({ _id: id })
    .then((userProfile) => {
      if (!userProfile) res.sendStatus(404);
      else res.status(200).send(userProfile);
    })
    .catch(next);
};

userController.getAllUserbyParam = (req, res, next) => {
  // console.log(req.user);
  // // find --> excluya id req.user.id
  // // populate === conincida con req.body. 1 -> skill tecnhologies mente o mentor
  // /// exclude -> los que ya tenemos
  // // si tengo mentor --- puedo buscar otroa para reemplazar... no puedo tener tener. ... -> que no metraiga el que tengo
  // // mentor busca mentees ?  excluir del get los que ya tiene
  // const { role } = req.body;
  // User.find({
  //   role: { $in: role },
  //   _id: { $ne: req.user._id },
  //   _id: { $nin: req.user.mentees },
  // })
  //   .populate("location")
  //   .populate("mentees")
  //   .populate("mentor")
  //   .populate("areas")
  //   .populate("technologies")
  //   .then((userstype) => {
  //     if (!userstype) res.sendStatus(404);
  //     else res.status(200).send(userstype);
  //   })
  //   .catch(next);
};

module.exports = userController;
