import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>Assignment 02 — CDN App</h1>
  <p>Ortizcarmen — carmen_c19@umes.edu.gt</p>
  <button id="btn">Probar App</button>
  <p id="msg"></p>
`;

document.getElementById('btn').onclick = () => {
  document.getElementById('msg').innerText =
    'Aplicación estática lista para CDN 🚀';
};

// Test comment
