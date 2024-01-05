import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API_KEY
  pageSize = 15;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar color="#0A080D" height={3} progress={this.state.progress} />
          <Routes>
            <Route
              path="/"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"general"}
                ></News>
              }
            />
            <Route
              path="/business"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"business"}
                ></News>
              }
            />
            <Route
              path="/entertainment"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"entertainment"}
                ></News>
              }
            />

            <Route
              path="/health"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"health"}
                ></News>
              }
            />

            <Route
              path="/science"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"science"}
                ></News>
              }
            />

            <Route
              path="/sports"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
                  country={"in"}
                  category={"sports"}
                ></News>
              }
            />

            <Route
              path="/technology"
              element={
                <News apiKey={this.apiKey}  setProgress={this.setProgress} 
                  pageSize={this.pageSize}
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
