import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState([]);
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setUserLatitude(latitude);
        setUserLongitude(longitude);
      },
      err => {
        alert(err);
      },
      { timeout: 30000 }
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude: userLatitude,
      longitude: userLongitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">
          Usuário do Github{' '}
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </label>
      </div>

      <div className="input-block">
        <label htmlFor="techs">
          Tecnologias{' '}
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </label>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            Latitude{' '}
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={userLatitude}
              onChange={e => setUserLatitude(e.target.value)}
            />
          </label>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={userLongitude}
              onChange={e => setUserLongitude(e.target.value)}
            />
          </label>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
