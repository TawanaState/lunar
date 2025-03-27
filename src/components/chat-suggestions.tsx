export default function ChatSuggestions(){
    return <div className="grid grid-cols-3 gap-6 my-4">
        <ChatSuggestion title="Do Math" description="I can help you with math problems" icon="function" prompt="What math problem do you have?"/>
        <ChatSuggestion title="Do Math" description="I can help you with math problems" icon="function" prompt="What math problem do you have?"/>
        <ChatSuggestion title="Do Math" description="I can help you with math problems" icon="function" prompt="What math problem do you have?"/>
    </div>
}



type ChatSuggestionProps = {
    title: string;
    description: string;
    icon: string;
    prompt:string;
}
function ChatSuggestion(props:ChatSuggestionProps){
    return <div className="flex flex-col gap-1 p-6 bg-muted rounded-md cursor-pointer">
        <span className="mso !text-4xl">{props.icon}</span>
        <span className="font-bold">{props.title}</span>
        <span className="text-muted text-sm">{props.description}</span>
    </div>;
}