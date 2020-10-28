import React from "react";
import axios from "axios";

import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
  
export default class App extends React.Component {
  state = {
    spells: [],
    classes: [],
    subclasses: [],
  };

  componentDidMount() {
    axios.get(`https://www.dnd5eapi.co/api/classes`).then((res) => {
      const classes = res.data.results;
      this.setState({ classes });
    });
    axios.get(`https://www.dnd5eapi.co/api/subclasses`).then((res) => {
      const subclasses = res.data.results;
      this.setState({ subclasses });
    });
  }

  handleChangeClass(event) {
    axios
      .get(`https://www.dnd5eapi.co/api/classes/${event.target.value}/spells`)
      .then((res) => {
        const spells = res.data.results;
        this.setState({ spells });
      });
  }

  handleChangeSubClass(event) {
    axios
      .get(`https://www.dnd5eapi.co/api/subclasses/${event.target.value}`)
      .then((res) => {
        return axios.get(
          `https://www.dnd5eapi.co/api/classes/${res.data.class.index}/spells`
        );         
      }).then((res) => {
        const spells = res.data.results;
        this.setState({ spells });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header container">
          <form>
            <div className="row">
              <div className="col">
                <div class="form-group">
                  <label for="Classes">Classes:</label>
                  <select
                    className="form-control"
                    onChange={(e) => this.handleChangeClass(e)}
                  >
                    {this.state.classes.map(function (data, key) {
                      return (
                        <option key={key} value={data.index}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col">
                <div class="form-group">
                  <label for="Subclasses">Subclasses: </label>
                  <select
                    className="form-control"
                    onChange={(e) => this.handleChangeSubClass(e)}
                  >
                    {this.state.subclasses.map(function (data, key) {
                      return (
                        <option key={key} value={data.index}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </form>

          <div class="my-3 p-3 bg-white rounded box-shadow">
            {this.state.spells.map((spell) => (
              <div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong class="d-block text-gray-dark">{spell.name}</strong>
                </p>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

