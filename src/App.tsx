import './App.css'
import NewChatHeader from './components/newchat'
import ChatSuggestions from './components/chat-suggestions'
import ChatInput from './components/chat-input'
import ChatMessages from './components/chat-messages'
import React from 'react'
import { chat } from './utils/utils'
import { ChatResponse, Message } from 'ollama';



function App() {

  const [messages, setMessages] = React.useState<Message[]>([]);

  const sendMessage = (message: Message) => {
    setMessages((prev:Message[]) => {
      let newArr = [...prev, message];
      let msg_id = newArr.length - 1

      chat(
        newArr,
        "gemma3:1b",
        (data : ChatResponse) => {
          console.log(data);
          newStreamMessage(msg_id, data.message);
        }
      );

      return newArr;
    });

  }



  const updateMessage = (id:number, message:Message) => {
    setMessages((prev:Message[]) => prev.map((v:Message, k:number) => k === id ? message : v))
  }


  const newStreamMessage = (id:number, message:Message) => {
    setMessages((prev:Message[]) => prev.map((v:Message, k:number) => {
      if(k === id){
        let newmsg = v;
        newmsg.content = v.content + message.content;
        return newmsg;
      } else{
        return v;
      }
    }))
  }
  
  return (
    <>
      <NewChatHeader />
      <ChatSuggestions />
      <ChatMessages messages={messages} />
      <ChatInput sendmsg={sendMessage} />
    </>
  )
}

export default App
