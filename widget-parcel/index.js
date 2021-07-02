import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App.js";

const WidgetDivs = document.querySelectorAll(".react-widget");

// Inject our React App into each
WidgetDivs.forEach((Div) => {
    ReactDOM.render(
        <React.StrictMode>
            <App domElement={Div} />
        </React.StrictMode>,
        Div
    );
});

// ReactDOM.render(<App />, document.getElementById("react-widget"));
