const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
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

      const techsArray = techs.split(',').map(tech => tech.trim());

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
};
