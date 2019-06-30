import React, { Component } from 'react';
import axios from 'axios';

class EditSmurf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`http://localhost:3333/smurfs/${id}`)
        .then( response => {
            this.setState({
                name: response.data.name,
                age: response.data.age,
                height: response.data.height
            })
        })

        .catch( err => {
            console.log("Error:", err);
            })
        }
  
  
  
  
  deleteSmurf = event => {
    event.preventDefault();

    const id = this.props.match.params.id

    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then((response) => {

        this.props.updateSmurfs(response.data);

        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error:", err)
      })

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  changeSmurf = event => {
    event.preventDefault();

    const id = this.props.match.params.id;
    const { name, age, height } = this.state;
    const payload = { name, age, height }

    axios.post(`http://localhost:3333/smurfs/${id}`, payload)
      .then((response) => {

        this.props.updateSmurfs(response.data);

        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error:", err)
      })

    this.setState({
      name: '',
      age: '',
      height: ''
    });

    
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.changeSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Update Smurf</button>
          <button onClick={this.deleteSmurf}>Delete</button>
        </form>
      </div>
    );
  }
}

export default EditSmurf;
