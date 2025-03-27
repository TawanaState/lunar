import React from "react";
import MarkdownRenderer from "./markdown-renderer";

export default function ChatMessages(props:any){

    return <div className="messages">
        {
            props.messages.map((v:any, k:number) => {
                return <Message key={k+"--message"} content={v.content}/>
            })
        }
    </div>
}

function Message(props:any) {
    return <article className="w-[70%]">
        <MarkdownRenderer content={props.content} />
    </article>
}