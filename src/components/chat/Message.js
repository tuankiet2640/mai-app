export default function Message({ message }) {
    const isUser = message.role === 'user';
    const messageClass = isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900';
    const timestampClass = isUser ? 'text-blue-200' : 'text-gray-600';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`} role="listitem">
            <div className={`max-w-xl p-4 rounded-lg ${messageClass}`} aria-live="polite">
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${timestampClass}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}