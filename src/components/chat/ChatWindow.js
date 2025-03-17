import Message from './Message';
import InputArea from './InputArea';



export default function ChatWindow({ messages, sendMessage }) {
    messages = [
        { role: "user", content: "Hello, how are you? I hope you're having a great day! I wanted to ask you about something that's been on my mind lately.", timestamp: Date.now() },
        { role: "assistant", content: "I'm good, thanks! How can I help you today? Feel free to ask me anything, and I'll do my best to assist you with whatever you need.", timestamp: Date.now() },
        { role: "user", content: "Can you help me with my code? I'm working on a project and I've run into a few issues that I can't seem to figure out on my own. Any help would be greatly appreciated!", timestamp: Date.now() },
        { role: "assistant", content: "Of course! What do you need help with? Please provide me with some details about the issues you're facing, and I'll do my best to guide you through them.", timestamp: Date.now() },
        { role: "user", content: "Well, I'm trying to implement a chat window in my application, and I keep getting a TypeError. I'm not sure what's causing it, and it's been quite frustrating. Any ideas on how to fix it?", timestamp: Date.now() },
        { role: "assistant", content: "Let's take a look at your code and see if we can identify the problem. It might be something simple that we can fix quickly. Please share the relevant parts of your code with me.", timestamp: Date.now() },
        { role: "user", content: "Sure, here's the code for my ChatWindow component. I've been trying to figure out why the messages aren't displaying correctly, and I keep getting an error related to the 'map' function.", timestamp: Date.now() },
        { role: "assistant", content: "Thanks for sharing your code. It looks like the issue might be related to how the messages array is being handled. Let's go through it step by step and see if we can find a solution.", timestamp: Date.now() }
    ];
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 pb-24">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white">
                <InputArea sendMessage={sendMessage} />
            </div>
        </div>
    );
}