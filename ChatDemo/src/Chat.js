import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({ message: '' });

        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12" style={{ padding: "10px" }}>
                        <div>
                            <div>
                                <h1>Online Chat</h1>
                                <hr />
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <p className={this.state.username === message.author ?
                                                "bg-success chat-text" : "bg-info text-warning chat-text"}
                                                key={message.author}>
                                                <strong>{message.author}: </strong>
                                                {message.message}
                                            </p>
                                        )
                                    })}
                                </div>
                                <hr />
                            </div>
                            <div>
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;