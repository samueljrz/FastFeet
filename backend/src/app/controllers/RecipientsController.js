import Recipient from '../models/Recipient';
import User from '../models/User';

import RecipientValidation from '../validation/RecipientsValidation';

const { Op } = require('sequelize');

class UserController {
  async store(req, res) {
    if (!(await RecipientValidation.storeValidation(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }

  async update(req, res) {
    if (!(await RecipientValidation.updateValidation(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, zip } = req.body;

    const user = await User.findByPk(req.userId);
    const recipient = await Recipient.findOne({
      where: {
        [Op.and]: [{ name }, { zip }],
      },
    });
    const email = 'admin@fastfeet.com';

    if (email !== user.email) {
      return res.status(401).json({ error: "You don't have permission" });
    }

    const {
      id,
      street,
      number,
      complement,
      state,
      city,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }
}

export default new UserController();
