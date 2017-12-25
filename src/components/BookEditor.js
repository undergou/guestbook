import React from 'react';

require('./BookEditor.css');

export default class BookEditor extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            nameValid:false,
            email:'',
            emailValid: false,
            message:'',
            messageValid:false
        }
    }
    handleInputChange(event){
        let name = event.target.name;
        let value = event.target.value;
        let nameValid = event.target.name + 'Valid';
        let valid = (name=='name')?this.validateName(value):(name=='email')?this.validateEmail(value):this.validateMessage(value);
        this.setState({[name]: value});
        this.setState({[nameValid]: valid});
    }
    validateName(name){
        return name !='';
    }
    validateEmail(email){
        let regEmail = /.+@.+\..+/;
        return email !='' && email.match(regEmail);
    }
    validateMessage(message){
        return message !='';
    }
    addNewMessage(){
        if(this.state.nameValid&&this.state.emailValid&&this.state.messageValid){
            let newMessage = {name: this.state.name, email: this.state.email, message: this.state.message};
            this.props.onAddMessage(newMessage);
            this.setState({name:'', nameValid:false, email:'',emailValid: false, message:'', messageValid:false});
        }

    }
    render(){
        let obj = {name: this.state.name, email: this.state.email, message:this.state.message};
        return (
                <div className="editor">
                    <div className="add-message">Add new message</div>
                    <div className="editor-name">Name: <br/><label><input name="name"  type="text" placeholder="Your name..." onChange={this.handleInputChange.bind(this)} value={this.state.name} className={(this.state.nameValid)?'input-green':'input-red'}/></label></div>
                    <div className="editor-email">Email: <br/><label><input name="email" type="text" placeholder="Your email..." onChange={this.handleInputChange.bind(this)} value={this.state.email} className={(this.state.emailValid)?'input-green':'input-red'}/></label></div>
                    <div className="editor-message">Message: <br/><label><textarea name="message" cols="50" rows="8"  placeholder="Your message..."  onChange={this.handleInputChange.bind(this)} value={this.state.message} className={(this.state.messageValid)?'input-green':'input-red'} /></label></div>
                    <div id="add-btn" className={(this.state.nameValid&&this.state.emailValid&&this.state.messageValid)?'add-btn':'disabled-btn'}  onClick={this.addNewMessage.bind(this)}>Add message</div>
                    <div className={this.props.status.statusSend=='ok'?'send-message-ok':'send-message-error'} status={{display: !this.props.status.statusSend?'block':'none'}}>{this.props.status.statusMessage}</div>
                </div>
        );
    }
}