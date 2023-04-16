import React, { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";
class App extends Component {
  state = {
    names: [],
    filteredNames: [],
    searchQuery: "",
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          names: data,
          filteredNames: data,
        });
      });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const { names } = this.state;

    const filteredNames = names.filter((name) =>
      name.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      searchQuery: value,
      filteredNames,
    });
  };

  render() {
    const { filteredNames, searchQuery } = this.state;
    const { handleInputChange } = this;
    console.log("render");
    return (
      <div className="App">
        <SearchBox
          className="Search-box"
          onChangeHandler={handleInputChange}
          placeholder="Search monsters"
        />

        <CardList monsters={filteredNames} />
      </div>
    );
  }
}

export default App;
