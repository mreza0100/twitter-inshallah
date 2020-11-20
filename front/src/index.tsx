// import "./helpers/test";
// !--
import "react-confirm-alert/src/react-confirm-alert.css";
import * as styledHelpers from "./helpers/style-helpers";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./components/App";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import React from "react";

ReactDOM.render(
	<ThemeProvider theme={styledHelpers}>
		<CssBaseline />
		<ToastContainer />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
