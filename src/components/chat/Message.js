export default function Message({ message }) {
    const isUser = message.role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`} >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>);
}