import { ChatTurn, genTitle, genUniqueID } from "../utils/utils";
import { Listen } from "../utils/speech";
import ollama from "ollama/browser";
import React from "react";
import { MessagesContext } from "../utils/contexts";
import { LoadingContext } from "../utils/contexts";
import { db } from "../utils/db";

export default function ChatInput() {

    // Accessing context
    const context = React.useContext(MessagesContext);
    const setMessages = context ? context[1] : () => {};
    const messages = context ? context[0] : [];

    // Accessing context
    const loading_context = React.useContext(LoadingContext);
    const setLoading = loading_context ? loading_context[1] : () => {};
    const loading = loading_context ? loading_context[0] : false;

    const sendMessage = (text:string) => {
        setMessages((prev:ChatTurn[]) => {
            return [...prev, {
                user : {
                    role : "user",
                    content : text,
                },
                id : genUniqueID(),
                visible:true
            }]
        });
        
        if (window.chatid == undefined) {
            // Add initial chat
            genTitle(text).then((title) => {
                db.chats.add({
                    title : title.message.content,
                    messages : []
                }).then((id:number) => {
                    window.chatid = id;
                });
            })
            
        }
    }

    const onsendClick = (e:any) => {
        let newquery = (document.querySelector("#input-el") as HTMLSpanElement)?.innerText || "";
        console.log("--new query:", newquery)
        sendMessage(newquery);
        (document.querySelector("#input-el") as HTMLSpanElement).innerText = "";
    }

    const voicemodeClick = (e:any) => {
        console.log("Running voice");
        Listen((text:string) => {
            //sendMessage(text);
            (document.querySelector("#input-el") as HTMLSpanElement).innerText = text;
        })
    }

    return <form id="chat-input" data-chat-mode={messages.length === 0 ? "false" : "true"} className="flex flex-row gap-2 py-1 px-2 bg-muted rounded-r-lg rounded-l-lg">
        <button type="button" onClick={voicemodeClick} className="mso p-2 place-self-end">graphic_eq</button>
        <span id="input-el" className="bg-transparent outline-none border-none text-lg md:w-[35vw] w-[100%] block flex-grow max-h-[150px] overflow-y-auto py-2" contentEditable={true}>{""}</span>
        {
            loading ? <button onClick={() => {ollama.abort(); setLoading(false);}} className="p-2 mso place-self-end">stop_circle</button> : <button type="button" onClick={onsendClick} className="p-2 mso place-self-end">Send</button>
        }
        
    </form>
}