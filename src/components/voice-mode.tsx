import React from "react";
import { MessagesContext } from "../utils/contexts";
import { ModelSelect } from "./nav";
import { ChatTurn, genUniqueID } from "../utils/utils";
import { Speak, Listen } from "../utils/speech";

export default function VoiceModeUI() {

    // Accessing context
    const context = React.useContext(MessagesContext);
    const messages = context ? context[0] : [];
    const setMessages = context ? context[1] : () => { };

    const [prevChats, setPrevChats] = React.useState<string[]>([]);

    React.useEffect(() => {
        // Init System
        setMessages((prev: any) => {
            return [...prev, {
                user: {
                    role: "user",
                    content: "Your name is *Lunar* from now on, and you are a conversational AI assistant. Just give out text content, no markdown or code. Be concise and very short!",
                },
                system: {
                    role: "system",
                    content: "Okay. Got it!",
                },
                id: "chat-init",
            }];
        });

        // Init listen
        Listen((text: string) => {
            setMessages((prev: ChatTurn[]) => {
                return [...prev, {
                    user: {
                        role: "user",
                        content: text,
                    },
                    id: genUniqueID(),
                    visible: true
                }]
            })
        }, () => {

        })
    }, []);


    React.useEffect(() => {
        messages.forEach((v: ChatTurn) => {//
            if (!prevChats.includes(v.id)) {// Setting the other default to chat-init because i know it will always be there
                setPrevChats((prev:any) => {
                    return [...prev, v.id]
                });
                Speak(v.system?.content);
            }
        })
    }, [messages]);

    return <div id="voice-mode" className="w-full h-full bg-muted fixed z-10 top-0 left-0 transition-all flex-col justify-between items-center hidden">
        <div>
            <h2>Lunar</h2>
            <ModelSelect />
        </div>
        <div>

        </div>
    </div>
}