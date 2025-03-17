import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setActiveConversation, 
    setSearchQuery,
    fetchConversations 
} from '../../store/conversationSlice';
import { 
    selectFilteredConversations, 
    selectActiveConversation,
    selectSearchQuery 
} from '../../store/selectors';

export default function Sidebar() {
    const dispatch = useDispatch();
    const conversations = useSelector(selectFilteredConversations);
    const activeConversation = useSelector(selectActiveConversation);
    const searchQuery = useSelector(selectSearchQuery);

    useEffect(() => {
        dispatch(fetchConversations());
    }, [dispatch]);

    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Chat History
                </h2>
                <button 
                    onClick={() => dispatch(setActiveConversation(null))}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-left text-sm mb-4"
                >
                    + New Chat
                </button>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                    <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversations.map((conversation) => (
                    <div 
                        key={conversation.id}
                        onClick={() => dispatch(setActiveConversation(conversation.id))}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeConversation === conversation.id 
                                ? 'bg-gray-100 dark:bg-gray-700' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {conversation.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {conversation.preview}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {new Date(conversation.lastUpdated).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}