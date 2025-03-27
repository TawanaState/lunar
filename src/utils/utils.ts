import { ChatResponse } from 'ollama';
import ollama from 'ollama/browser';



/* messages format : 
[
    {content: "Hello", role: "user" | "system" | "assistant"},
]
*/
export async function chat(messages : any[], model:string, ongenerated:(response:ChatResponse)=>void){
    const response = await ollama.chat({ model: model, messages, stream: true })
    for await (const part of response) {
        ongenerated(part);
    }
    return true;
}

