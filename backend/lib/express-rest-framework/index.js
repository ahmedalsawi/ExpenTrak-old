class APIViewSet {
  constructor(model, serializer) {
    this.model = model;
    this.serializer = serializer;
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.putId = this.putId.bind(this);
    this.getId = this.getId.bind(this);
    this.deleteId = this.deleteId.bind(this);
  }

  async get(req, res) {
    try {
      const trans = await this.model.find({
        user: req.user._id
      })
      return res.status(200).json(trans)
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async post(req, res) {
    const validated = this.serializer(req.body)
    if (validated.error) {
      return res.status(400).json({
        message: validated.error.details[0].message
      });
    }

    const tran = new this.model({
      ...validated.value,
      user: req.user._id
    })

    try {
      const newTran = await tran.save()

      res.status(201).json(
        newTran
      )
    } catch (err) {
      return res.sendStatus(500);
    }

  }

  async putId(req, res) {
    const validated = this.serializer(req.body)
    if (validated.error) {
      return res.status(400).json({
        message: validated.error.details[0].message
      });
    }

    const id = req.params.id;
    try {
      const tran = await this.model.findOneAndUpdate({
        user: req.user._id,
        _id: id
      }, {
        ...validated.value,
      }, {
        new: true
      })
      if (!tran) {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.status(200).json(tran)
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.sendStatus(500);
    }
  }

  async getId(req, res) {
    const id = req.params.id;
    try {
      const tran = await this.model.findOne({
        user: req.user._id,
        _id: id
      })
      if (!tran) {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.status(200).json(tran)
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.sendStatus(500);
    }
  }

  async deleteId(req, res) {
    const id = req.params.id;
    try {
      const tran = await this.model.findOneAndRemove({
        user: req.user._id,
        _id: id
      })
      if (!tran) {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.sendStatus(204);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Not Found " + id
        });
      }
      return res.sendStatus(500);
    }
  }

  routes(url, router) {
    router.get(`${url}`, this.get)
    router.post(`${url}`, this.post)
    router.get(`${url}/:id`, this.getId)
    router.put(`${url}/:id`, this.putId)
    router.delete(`${url}/:id`, this.deleteId)
  }
}

module.exports = APIViewSet;