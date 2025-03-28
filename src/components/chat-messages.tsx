import React from "react";
import MarkdownRenderer from "./markdown-renderer";
import { chat as LLMChat, ChatTurn } from "../utils/utils";
import { MessagesContext, ModelContext, LoadingContext } from "../utils/contexts";
import { ChatResponse } from "ollama";

export default function ChatMessages(){

    const context = React.useContext(MessagesContext);
    const messages = context ? context[0] : [];

    return <div className="messages py-12 [overflow-anchor:auto]">
        {
            messages && messages.map((v:ChatTurn) => {
                return v.visible ? <Message key={v.id+"--message"} value={v}/> : <></>
            })
        }
    </div>
}

function Message(props:{
    value:ChatTurn;
}) {

    const hasRun = React.useRef(false);

    // Accessing context
    const context = React.useContext(MessagesContext);
    const messages = context ? context[0] : [];
    const setMessages = context ? context[1] : () => {};

    const [modelOutput, setModelOutput] = React.useState("");

    const model_context = React.useContext(ModelContext);
    const LANGUAGE_MODEL = model_context ? model_context[0] : "";

    const loading_context = React.useContext(LoadingContext);
    const setLoading = loading_context ? loading_context[1] : () => {};

    const updateMessage = (message:ChatTurn) => {
        setMessages((prev : ChatTurn[]) => {
            return prev && prev.map((v:ChatTurn) => {
                return v.id == message.id ? message : v;
            })
        });
    }

    React.useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (props.value.system) {
            setModelOutput(props.value.system.content);
        }else{
            LLMChat(
                messages,
                LANGUAGE_MODEL,
                (response:ChatResponse) => {
                    //console.log(response, "--gen");
                    setModelOutput((prev:string) => {
                        if (response.done) {
                            updateMessage({
                                ...props.value,
                                system : {
                                    ...response.message,
                                    content : prev + response.message.content
                                }
                            })// Updating message if it is done generating!
                        }
                        setLoading(!response.done);
                        return prev + response.message.content;// Appending the new stream
                    });
                }
            );
        }
    }, []);

    return <>
    <article className="md:max-w-[70%] max-w-[90%] w-fit prose prose-invert place-self-end bg-muted py-2 px-3 rounded-md my-4 mt-8">
        <MarkdownRenderer content={props.value.user?.content} />
    </article>
    <article className="w-full prose prose-invert my-4">
        <MarkdownRenderer content={modelOutput} />
    </article>
    </>
}
