import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route
              path="/"
              element={
                <News pageSize={5} country={"in"} category={"general"}></News>
              }
            />
            <Route
              path="/business"
              element={
                <News pageSize={5} country={"in"} category={"business"}></News>
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  pageSize={5}
                  country={"in"}
                  category={"entertainment"}
                ></News>
              }
            />

            <Route
              path="/health"
              element={
                <News pageSize={5} country={"in"} category={"health"}></News>
              }
            />

            <Route
              path="/science"
              element={
                <News pageSize={5} country={"in"} category={"science"}></News>
              }
            />

            <Route
              path="/sports"
              element={
                <News pageSize={5} country={"in"} category={"sports"}></News>
              }
            />

            <Route
              path="/technology"
              element={
                <News
                  pageSize={5}
                  country={"in"}
                  category={"technology"}
                ></News>
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
