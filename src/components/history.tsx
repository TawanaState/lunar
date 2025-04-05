import { useLiveQuery } from "dexie-react-hooks";
import { Chat, db } from "../utils/db";
import { MessagesContext } from "../utils/contexts";
import React from "react";
import { ChatTurn } from "../utils/utils";


export function History() {
    const [chats, setChats] = React.useState<Chat[]>([])
    React.useEffect(() => {
        db.chats.toArray().then((cal:Chat[]) => {
            setChats(cal);
        })
    }, [])
    return <div id="history-panel" className="bg-muted w-full md:w-[30vw] h-[100dvh] lg:w-[20vw] z-20 overflow-y-hidden shadow-lg hidden target:grid fixed top-0 left-0 p-4 grid-rows-[2fr,18fr]">
        <div className="border-b border-b-slate-600 border-solid flex flex-row justify-between items-center">
            <h3 className="font-bold text-xl">History</h3>
            <button className="py-2 mso" onClick={() => {window.location.hash = ""}}>close</button>
        </div>
        <div className="overflow-y-auto">
            <div className="flex flex-col-reverse gap-1">
                {
                    chats.map((val:Chat) => {
                        return <HistoryItem key={val.id + "--message-item"} id={val.id} title={val.title} />
                    })
                }
            </div>
        </div>
        
    </div>
}

function HistoryItem(props:any) {

    // Accessing context
    const context = React.useContext(MessagesContext);
    // const messages = context ? context[0] : [];
    const setMessages = context ? context[1] : () => {};

    const [destroyed, setDestroyed] = React.useState(false);

    const selectItem = (e:any) => {
        db.chats.get(props.id).then((_value: Chat|undefined) => {
            setMessages((_value?.messages as ChatTurn[]) || []);
            window.chatid = props.id;
        })
    }

    const deleteItem = (e:any) => {
        db.chats.delete(props.id).then(() => {
            setDestroyed(true);
        })
    }

    const onChangeTitle = (e:any) => {
        db.chats.update(props.id, {title: e.target.innerText});
    }

    return !destroyed ? <div className="p-1.5 hover:bg-slate-700/50 grid grid-cols-[11fr,1fr,1fr] gap-2 group rounded-md">
        <span className="outline-none line-clamp-1" onInput={onChangeTitle} contentEditable={true}>{props.title}</span>
        <button onClick={deleteItem} className="mso transition-opacity opacity-0 group-hover:opacity-100 !text-sm">delete</button>
        <button onClick={selectItem} className="mso transition-opacity opacity-0 group-hover:opacity-100 !text-sm">call_made</button>
    </div> : <></>
}