import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function RenderWithRouter({ children }) {
  return <Router>{children}</Router>;
}

export default RenderWithRouter;
