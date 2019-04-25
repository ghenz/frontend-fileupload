import React, { Component } from 'react';
import api from '../../service/api';
import './style.css';

import logo from '../../assets/logo.svg';

export default class Main extends Component {
  state = {
    newPasta: '',
    pastas: {}
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
    var title = [];
    if(this.state.pastas.length > 0){
      this.state.pastas.forEach(titles => {
      
        title.push(titles);

      })
    }


    return(
        <div id="main-container" >

            <ul>
            { title.map(title => (
                <a href={"/pasta/"+ title._id}>
                    <li>
                      {title.title}
                    </li>
               </a>
            )) }

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
