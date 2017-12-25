import React from 'react';
import BookMessages from './BookMessages.js';
import BookEditor from './BookEditor.js';
require('./BookApp.css');

export default class BookApp extends React.Component{
    constructor() {
        super();
        this.state = {
            messages: [],
            status: {
                statusSend:'',
                statusMessage:''
            }
        }
    }
    componentDidMount(){
        this.getMessages();
    }
    getMessages(){
        fetch('../src/getData.php',
            {
                headers : {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({messages: data});
            })
    }
    addNewMessage(newMessage){
        let newMessageJson = 'name='+newMessage.name+'&email='+newMessage.email+'&message='+newMessage.message;
        fetch('../src/addData.php',
            {
                headers : {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                method: 'POST',
                body: newMessageJson
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.status.statusSend = data.status;
                this.state.status.statusMessage = data.message;
                this.setState({status: this.state.status});
                this.getMessages();
            })
    }
    deleteMessage(id){
        let idJson = 'id='+id;
        fetch('../src/deleteMessage.php',
            {
                headers : {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                method: 'POST',
                body: idJson
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.status.statusSend = data.status;
                this.state.status.statusMessage = data.message;
                this.setState({status: this.state.status});
                this.getMessages();
            })
    }
    render(){
        return (
            <div className="wrap">
                <h1>Guest book on ReactJS</h1>
                <BookMessages messages={this.state.messages} onDeleteMessage={this.deleteMessage.bind(this)}/>
                <BookEditor onAddMessage={this.addNewMessage.bind(this)} status={this.state.status}/>
            </div>
        );
    }
}