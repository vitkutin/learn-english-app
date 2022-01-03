import "./App.css";
import React from "react";

class App extends React.Component {
  state = { vocabulary: [] };
  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/vocabulary");
    let json = await hr.json();
    this.setState({ vocabulary: json });
  }
  render() {
    if (this.state.vocabulary.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.vocabulary.map((voc) => (
        <ul key={voc.id} id="li">
          {voc.in_finnish} = {voc.in_english}
        </ul>
      ));
      return <ul>{ui}</ul>;
    }
  }
}
export default App;
