(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
  <h1>Assignment 02 — CDN App</h1>
  <p>Ortizcarmen — carmen_c19@umes.edu.gt</p>
  <button id="btn">Probar App</button>
  <p id="msg"></p>
`;document.getElementById("btn").onclick=()=>{document.getElementById("msg").innerText="Aplicación estática lista para CDN 🚀"};
