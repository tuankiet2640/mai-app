export default function Sidebar() {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Chat History
                </h2>
            </div>
            <div className="space-y-2">
                {['Conversation 1', 'Conversation 2', 'Conversation 3'].map((chat, i) => (
                    <div 
                        key={i} 
                        className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                            {chat}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Yesterday
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}