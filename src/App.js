import React from "react";
import ContainerStyles from "./App.style";
import Header from "./components/Header/Header";
import ContentContainer from "./components/Container/ContainerWrapper";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../src/redux/store";

function App() {
  return (
    <div className="App">
      //Read basename from the config
      <Router basename={BASE_NAME}>
        <ContainerStyles>
          <Container className="container">
            <Header />
            <ContentContainer />
          </Container>
        </ContainerStyles>
      </Router>
    </div>
  );
}

export default App;
