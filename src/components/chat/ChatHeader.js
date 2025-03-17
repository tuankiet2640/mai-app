export default function ChatHeader() {
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    AI Chat Assistant
                </h1>
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <svg 
                            className="w-6 h-6 text-gray-600 dark:text-gray-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}