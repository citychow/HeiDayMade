import { Navbar, Footer } from './component.js';

const path = window.location.pathname;
const page = path.split("/").pop().split("-")[0];

document.getElementById('footer').innerHTML = Footer();
document.getElementById('navbar').innerHTML = Navbar(page);
