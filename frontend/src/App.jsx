import React from "react";
import AppRouter from "./router";
import { MovieProvider } from "./context/MovieContext";

const App = () => (
  <MovieProvider>
    <AppRouter />
  </MovieProvider>
);

export default App;
import './index.css';