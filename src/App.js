import React from "react";
import OuterDiv, { HeaderStyles, HeaderSpan } from "./App.style";
import Header from "./components/Header/Header";
import ContentContainer from "./components/Container/Container";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <OuterDiv>
          <Container>
            <Header />
            <ContentContainer />
          </Container>
        </OuterDiv>
      </Router>
    </div>
  );
}

export default App;
