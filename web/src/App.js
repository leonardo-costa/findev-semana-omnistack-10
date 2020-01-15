import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

export default function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="" alt="" />
              <div className="user-info">
                <strong>Leonardo Carvalho</strong>
                <span>ReactJS, React Native, Node.JS</span>
              </div>
            </header>
            <p>
              CTO @rocketseat. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ab, enim et architecto alias est obcaecati id
              nisi quas tempore odit ratione consequuntur accusamus totam
              possimus perspiciatis quam a, veniam qui.
            </p>
            <a href="https://blank">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}
