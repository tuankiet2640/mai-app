export default function Message({ message }) {
    const isUser = message.role === 'user';
    const messageClass = isUser 
        ? 'bg-blue-600 text-white dark:bg-blue-700' 
        : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white';
    const timestampClass = isUser 
        ? 'text-blue-200 dark:text-blue-300' 
        : 'text-gray-600 dark:text-gray-400';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`} role="listitem">
            <div 
                className={`max-w-xl p-4 rounded-lg ${messageClass} shadow-sm`} 
                aria-live="polite"
            >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${timestampClass}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}