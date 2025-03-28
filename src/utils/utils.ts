import { ChatResponse, Message } from 'ollama';
import ollama from 'ollama/browser';

export const DEFAULT_MODEL = "deepseek-r1:1.5b";
export const STREAM_MODEL = true;
export type ChatTurn = {
    id?:string;
    user?:Message;
    system?:Message;
    visible?:Boolean;
}

/* messages format : 
[
    {content: "Hello", role: "user" | "system" | "assistant"},
]
*/

export function formatMessages(mylist:ChatTurn[]) : Message[]{
    let newlist:Message[] = [];
    mylist.forEach((v:ChatTurn) => {
        if(v.user){
            newlist.push(v.user);
        }
        if(v.system){
            newlist.push(v.system);
        }
    });
    return newlist;
}

export async function chat(messages:ChatTurn[], model:string, ongenerated:(response:ChatResponse)=>void){
    //console.log((await ollama.list()).models)
    const response = await ollama.chat({ model: model, messages: formatMessages(messages), stream: STREAM_MODEL })
    if (!STREAM_MODEL) {
        return response;
    }else{
        for await (const part of response) {
            ongenerated(part);
            //console.log(part, "--generated---");
        }
        return true;
    }
    
}

export function genRandomID(length:number){
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + ((new Date()).getTime()).toString();
}

export function genUniqueID(length:number = 16){
    return genRandomID(length);
}