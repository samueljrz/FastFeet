import Postman from '../models/Postman';
import File from '../models/File';
import PostmanValidation from '../validation/PostmanValidation';

class PostmanController {
  async index(req, res) {
    const postman = await Postman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(postman);
  }

  async store(req, res) {
    if (!(await PostmanValidation.storeValidation(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Postman.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await Postman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    if (!(await PostmanValidation.updateValidation(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    const postman = await Postman.findByPk(req.params.id);

    if (email !== postman.email) {
      const postmanExists = await Postman.findOne({ where: { email } });

      if (postmanExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id } = await postman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const postman = await Postman.findByPk(req.params.id);

    postman.destroy();

    return res.json({ message: 'Postman delete' });
  }
}

export default new PostmanController();
