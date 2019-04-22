import React, { Component } from 'react';
import api from '../../service/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import { MdInsertDriveFile } from 'react-icons/md';

import logo from '../../assets/logo.svg';
import './style.css';


export default class Pasta extends Component {
    state = { pasta: {} };

    async componentDidMount(){
        this.subscribeToNewFiles();

        const pasta = this.props.match.params.id;
        const response = await api.get(`boxes/${pasta}`)
        this.setState({ pasta: response.data })
    }

    subscribeToNewFiles = () => {
        const pasta = this.props.match.params.id;
        const io = socket('https://backend-fileupload.herokuapp.com');

        io.emit('connectRoom', pasta);

        io.on('file', data => {
            this.setState({ pasta: { ...this.state.pasta, files: [ data ,...this.state.pasta.files] } })
        });
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();

            data.append('file', file);

            const pasta = this.props.match.params.id;

            api.post(`boxes/${pasta}/files`, data)
        });
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="" />
                    <h1>{this.state.pasta.title}</h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" { ... getRootProps()}>
                        <input {... getInputProps()} />

                        <p>Arraste arquivos ou clique aqui</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    { this.state.pasta.files && this.state.pasta.files.map(file => (
                    <li key={file._id}>
                        <a className="fileInfo" href={file.url}>
                            <MdInsertDriveFile size={24} color="#A5CFFF" />
                            <strong>{file.title}</strong>
                        </a>
                        <span>
                        há{" "}
                        {distanceInWords(file.createdAt, new Date(), {
                            locale: pt
                        })}
                        </span>
                    </li>
                    )) }
                </ul>
            </div>
        );
    }
}
