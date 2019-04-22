import React, { Component } from 'react';
import api from '../../service/api';
import './style.css';

import logo from '../../assets/logo.svg';

export default class Main extends Component {
  state = {
    newPasta: ''
  };
  
  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post('boxes', {
      title: this.state.newPasta
    });    

    console.log(response.data)

    this.props.history.push(`/pasta/${response.data._id}`)    
  }

  handleInputChange = (e) => {
    this.setState({ newPasta: e.target.value });
  }

  render() {
    return(
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt=""></img>
                <input 
                  placeholder="Criar pasta" 
                  value={this.state.newPasta} 
                  onChange={this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
