const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    try {
      const { github_username, techs, latitude, longitude } = req.body;

      const devExists = await Dev.findOne({ github_username });

      if (devExists) {
        return res.status(401).json({ Error: 'Dev is already registered' });
      }

      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      const values = {
        name: name || login,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      };

      const dev = await Dev.create(values);

      return res.json(dev);
    } catch (error) {
      return res.json({ error: true });
    }
  },

  async update(req, res) {
    const { github_username } = req.query;
    const { name, techs, avatar_url, bio, latitude, longitude } = req.body;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const values = {
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    };

    await Dev.update(values);

    const devExists = await Dev.findOne({ github_username });

    if (!devExists) {
      return res.status(400).json({ error: 'Dev does not exists' });
    }

    return res.json(devExists);
  },

  async destroy(req, res) {
    const { github_username } = req.body;

    const devExists = await Dev.findOne({ github_username });

    if (!devExists) {
      return res.status(400).json({ error: 'Dev does not exists' });
    }

    await Dev.deleteOne({ github_username });

    const devs = await Dev.find();

    return res.json(devs);
  },
};
