import React from "react";
import ContainerStyles from "./App.style";
import Header from "./components/Header/Header";
import ContentContainer from "./components/Container/Container";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      //Read basename from the config
      <Router basename="/hiu">
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
