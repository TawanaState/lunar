import './App.css'
import NewChatHeader from './components/newchat'
import ChatSuggestions from './components/chat-suggestions'
import ChatInput from './components/chat-input'
import ChatMessages from './components/chat-messages'
import { useState } from 'react'
import { ChatTurn, DEFAULT_MODEL } from './utils/utils'
import { LoadingContext, MessagesContext, ModelContext } from './utils/contexts'
import { Nav } from './components/nav'
import VoiceModeUI from './components/voice-mode'


function App() {

  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [loading, setLoading] = useState(false);

  return (
    <>
    <MessagesContext.Provider value={[messages, setMessages]}>
      <ModelContext.Provider value={[model, setModel]}>
        <LoadingContext.Provider value={[loading, setLoading]}>

      {
        messages.length === 0 ? <><NewChatHeader />
        <ChatSuggestions /></> : <></>
      }
      <Nav />
      <ChatMessages />
      <ChatInput />
      {/* <VoiceModeUI /> */}
      
      </LoadingContext.Provider>
      </ModelContext.Provider>
    </MessagesContext.Provider>
    </>
  )
}

export default App
