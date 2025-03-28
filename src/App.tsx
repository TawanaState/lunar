import './App.css'
import NewChatHeader from './components/newchat'
import ChatSuggestions from './components/chat-suggestions'
import ChatInput from './components/chat-input'
import ChatMessages from './components/chat-messages'
import { useState } from 'react'
import { ChatTurn } from './utils/utils'
import { MessagesContext } from './utils/contexts'


function App() {

  const [messages, setMessages] = useState<ChatTurn[]>([]);

  return (
    <>
    <MessagesContext.Provider value={[messages, setMessages]}>

      {
        messages.length === 0 ? <><NewChatHeader />
        <ChatSuggestions /></> : <></>
      }
      <ChatMessages />
      <ChatInput />
    </MessagesContext.Provider>
    </>
  )
}

export default App
