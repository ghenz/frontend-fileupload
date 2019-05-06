import React, { Component } from 'react';
import api from '../../service/api';
// import { MdDelete } from 'react-icons/md';
import './style.css';

import logo from '../../assets/logo.svg';


export default class Main extends Component {
  state = {
    pastas: [],
    newPasta: ''
  };

  async componentDidMount(){

    const response = await api.get(`boxes`)
    this.setState({ pastas: response.data })

  }

  
  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post('boxes', {
      title: this.state.newPasta
    });    

    this.props.history.push(`/pasta/${response.data._id}`)    
  }

  handleInputChange = (e) => {
    this.setState({ newPasta: e.target.value });
  }



  render() {
    return(
        <div id="main-container" >

            <ul id="title-list">
              <h1>Minhas pastas</h1>
            { this.state.pastas.map(title => (
                    <li key={title._id}>
                      <a href={"/pasta/"+ title._id}>
                        <strong>{title.title}</strong>
                      </a>
                    </li>
            ))}

            </ul>
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
