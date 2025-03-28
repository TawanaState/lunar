import { ChatTurn, genUniqueID } from "../utils/utils";
import ollama from "ollama/browser";
import React from "react";
import { MessagesContext } from "../utils/contexts";
import { LoadingContext } from "../utils/contexts";

export default function ChatInput() {

    // Accessing context
    const context = React.useContext(MessagesContext);
    const setMessages = context ? context[1] : () => {};
    const messages = context ? context[0] : [];

    // Accessing context
    const loading_context = React.useContext(LoadingContext);
    const setLoading = loading_context ? loading_context[1] : () => {};
    const loading = loading_context ? loading_context[0] : false;

    const onsendClick = (e:any) => {
        let newquery = (document.querySelector("#input-el") as HTMLSpanElement)?.innerText || "";
        console.log("--new query:", newquery)
        setMessages((prev:ChatTurn[]) => {
            return [...prev, {
                user : {
                    role : "user",
                    content : newquery,
                },
                id : genUniqueID(),
                visible:true
            }]
        });
        (document.querySelector("#input-el") as HTMLSpanElement).innerText = "";
    }

    return <form id="chat-input" data-chat-mode={messages.length === 0 ? "false" : "true"} className="flex flex-row gap-2 py-1 px-2 bg-muted rounded-r-lg rounded-l-lg">
        <button type="button" className="mso p-2 place-self-end">attachment</button>
        <span id="input-el" className="bg-transparent outline-none border-none text-lg md:w-[35vw] w-[100%] block flex-grow max-h-[150px] overflow-y-auto py-2" contentEditable={true}>{""}</span>
        {
            loading ? <button onClick={() => {ollama.abort(); setLoading(false);}} className="p-2 mso place-self-end">stop_circle</button> : <button type="button" onClick={onsendClick} className="p-2 mso place-self-end">Send</button>
        }
        
    </form>
}