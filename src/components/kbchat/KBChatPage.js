import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import KBDropdown from './KBDropdown';
import ragService from '../../services/ragService';

/**
 * KBChatPage - Chat UI with Knowledge Base selection
 * Users can select a KB and chat with it (RAG).
 */
export default function KBChatPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedKb, setSelectedKb] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedKb) return;
    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError(null);
    try {
      const response = await ragService.queryKnowledgeBase(selectedKb.id, input);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.answer || (response.result || 'No answer.'),
        timestamp: new Date()
      }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${e.message}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
        <label htmlFor="kb-select" className="font-medium text-gray-700 dark:text-gray-200 mr-2">Knowledge Base:</label>
        <KBDropdown value={selectedKb?.id} onChange={setSelectedKb} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            Select a knowledge base and start chatting!
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-100'}`}>
              <span>{msg.content}</span>
              <div className="text-xs text-gray-400 mt-1 text-right">{msg.role === 'user' ? user?.username || 'You' : 'Assistant'}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 animate-pulse">
              Assistant is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-2 bg-white dark:bg-gray-900"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        autoComplete="off"
      >
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          placeholder={selectedKb ? `Ask about ${selectedKb.name}...` : 'Select a Knowledge Base'}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!selectedKb || isTyping}
          aria-label="Ask a question"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          disabled={!input.trim() || !selectedKb || isTyping}
        >
          Send
        </button>
      </form>
      {error && <div className="text-red-500 text-center p-2">{error}</div>}
    </div>
  );
}
