export default function ChatInput(props:any) {
    return <div className="flex flex-row gap-2 py-2 px-4 bg-muted rounded-r-full rounded-l-full">
        <button className="mso p-2">attachment</button>
        <textarea rows={1} className="bg-transparent outline-none border-none text-lg w-[30vw]" placeholder="Type a message..." name="" id=""></textarea>
        <button className="p-2 mso">Send</button>
    </div>
}