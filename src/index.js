import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./RegisterServiceWorker";
import Root from "./Root";
import "./styles/index.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
