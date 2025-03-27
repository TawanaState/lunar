import React from "react"

export default function ChatInput(props:any) {

    const onsendClick = (e:any) => {
        props.sendmsg({
            role : "user",
            content : document.querySelector("#input-el")?.innerHTML
        })
    }

    return <form id="chat-input" className="flex flex-row gap-2 py-2 px-4 bg-muted rounded-r-lg rounded-l-lg">
        <button type="button" className="mso p-2 place-self-end">attachment</button>
        <span id="input-el" className="bg-transparent outline-none border-none text-lg w-[30vw] block" contentEditable={true}>{""}</span>
        <button type="button" onClick={onsendClick} className="p-2 mso place-self-end">Send</button>
    </form>
}