// NusaData — boot: render the route from the URL hash, re-render on change.
import { render } from "./views.js";

window.addEventListener("hashchange", render);
render();
