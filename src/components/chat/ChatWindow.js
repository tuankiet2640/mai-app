import Message from './Message';
import InputArea from './InputArea';



export default function ChatWindow({ messages, sendMessage }) {
    messages = [
        { role: "user", content: "Hello, how are you?", timestamp: Date.now() },
        { role: "assistant", content: "I'm good, thanks! How can I help you today?", timestamp: Date.now() },
        { role: "user", content: "Can you help me with my code?", timestamp: Date.now() },
        { role: "assistant", content: "Of course! What do you need help with?", timestamp: Date.now() }
    ];
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (<Message key={index} message={message} />))}
            </div> <InputArea sendMessage={sendMessage} />
        </div>);
}