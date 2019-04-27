const { User, Appointment } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class DashboardController {
  async index(req, res, next) {
    const { email } = req.session.user;
    const isProvider = await User.findOne({
      where: { email, provider: true }
    });

    if (isProvider) {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: "user" }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf("day")
                .format(),
              moment()
                .endOf("day")
                .format()
            ]
          }
        }
      });

      return res.render("dashProvider", { appointments });
    }

    const providers = await User.findAll({ where: { provider: true } });

    return res.render("dashUser", { providers });
  }
}

module.exports = new DashboardController();
