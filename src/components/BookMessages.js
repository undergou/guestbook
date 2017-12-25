import React from 'react';
require('./BookMessages.css');

export default class BookMessages extends React.Component{
    constructor(){
        super();
        this.state = {
            isAdmin:''
        }
    }
    componentDidMount(){
    fetch('../src/checkIsAdmin.php')
.then((response) => {
    return response.json();
})
    .then((data) => {
        this.setState({isAdmin:data});
    })
    }
    deleteMessage(id){
        this.props.onDeleteMessage(id);
    }
    render(){
        const messages = this.props.messages.map((item, index) =>{
           return <div className="message" key={index}><div className="message-head"><span className="bold">From:</span> {item.name} ({item.email})</div><div className="message-text">{item.message}</div><div className="message-delete" style={{display: this.state.isAdmin?'block':'none'}}><span onClick={this.deleteMessage.bind(this, item.id)}>Delete</span></div></div>
        });
        return <div>{messages}</div>;
    }
}