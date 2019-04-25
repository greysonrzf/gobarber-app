const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    console.log("req.body:", req.body);

    const user = User.findOne({ where: { email } });

    console.log("user:", user.prototype);

    if (!user) {
      console.log("Usuário não localizado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      console.log("Senha incorreta");
      return res.redirect("/");
    }

    return res.redirect("/app/dashboard");
  }
}

module.exports = new SessionController();
