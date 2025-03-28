import { ChatTurn, genUniqueID } from "../utils/utils"
import React from "react";
import { MessagesContext } from "../utils/contexts";

export default function ChatInput() {

    // Accessing context
    const context = React.useContext(MessagesContext);
    const setMessages = context ? context[1] : () => {};
    const messages = context ? context[0] : [];

    const onsendClick = (e:any) => {
        setMessages((prev:ChatTurn[]) => {
            return [...prev, {
                user : {
                    role : "user",
                    content : document.querySelector("#input-el")?.innerHTML || "",
                },
                id : genUniqueID()
            }]
        })
    }

    return <form id="chat-input" data-chat-mode={messages.length === 0 ? "false" : "true"} className="flex flex-row gap-2 py-1 px-2 bg-muted rounded-r-lg rounded-l-lg">
        <button type="button" className="mso p-2 place-self-end">attachment</button>
        <span id="input-el" className="bg-transparent outline-none border-none text-lg w-[35vw] block flex-grow max-h-[150px] overflow-y-auto py-2" contentEditable={true}>{""}</span>
        <button type="button" onClick={onsendClick} className="p-2 mso place-self-end">Send</button>
    </form>
}