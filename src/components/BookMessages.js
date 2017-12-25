import React from 'react';
require('./BookMessages.css');

export default class BookMessages extends React.Component{
    constructor(){
        super();
        this.state = {
            ip:''
        }
    }
    componentDidMount(){
    fetch('http://localhost/projects-iamit/guestbook2/src/getIp.php')
.then((response) => {
    return response.json();
})
    .then((data) => {
        this.setState({ip:data});
    })
    }
    deleteMessage(id){
        this.props.onDeleteMessage(id);
    }
    render(){
        const messages = this.props.messages.map((item, index) =>{
           return <div className="message" key={index}><div className="message-head"><span className="bold">From:</span> {item.name} ({item.email})</div><div className="message-text">{item.message}</div><div className="message-delete" style={{display: this.state.ip=='::1'?'block':'none'}}><span onClick={this.deleteMessage.bind(this, item.id)}>Delete</span></div></div>
        });
        return <div>{messages}</div>;
    }
}