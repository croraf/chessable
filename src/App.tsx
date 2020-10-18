import React from "react";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: 0,
      "font-family":
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale"
    }
  }
});

function App() {
  useStyles();

  // React Router can be added here
  // MUI Theme can be added here
  return (
    <div style={{ width: "100%" }}>
      <Home />
    </div>
  );
}

export default App;
