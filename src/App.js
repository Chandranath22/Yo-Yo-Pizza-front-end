
import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            id: 1,
            avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
        };
        this.bot = { 
            id: 0,
            name: 'Yo Yo',
            avatarUrl: "https://demos.telerik.com/kendo-ui/content/chat/InsuranceBot.png"
        };
        this.state = {
            messages: [
                {
                    author: this.bot,
                    suggestedActions: [
                        {
                            type: 'reply',
                            value: 'Order pizza?'
                        }, {
                            type: 'reply',
                            value: 'Track order'
                        }
                    ],
                    timestamp: new Date(),
                    text: "Hello, I am your assistent today. How can I help you?"
                }
            ]
        };
    }

    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        fetch('https://thawing-temple-39104.herokuapp.com/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                queryInput: {
                    text: {
                        text: event.message.text,
                        languageCode: "en-US"
                    }
                }
            })
        })
            .then(response => response.text())
            .then(data => {
                botResponce.text = data;
                botResponce.author = this.bot;
                this.setState(prevState => ({
                    messages: [
                        ...prevState.messages,
                        botResponce
                    ]
                }));
            })
    };

    render() {
        return (
            <div>
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={400}>
                </Chat>
            </div>
        );
    }
}

export default App;
