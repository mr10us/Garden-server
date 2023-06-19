const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class TypeController {
  async create(req, res) {
    const { name, nameUrl } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const type = await Type.create({ name, nameUrl, img: fileName });

    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const { name } = req.body;
    const type = await Type.findOne({where: {name: name}})

    const result = await Type.destroy({where: {id: type.id}, force: true})

    return res.json(result)
  }
}

module.exports = new TypeController();
