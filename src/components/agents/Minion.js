import React, { useState, useEffect, useRef } from 'react';
import MinionService from '../../services/MinionService';
import { mockTasks } from '../../mocks/minionData';
import { 
  llmProviders, 
  localModels, 
  remoteModels, 
  protocols,
  defaultConfig 
} from '../../mocks/minionConfig';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export default function Minion() {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'config'
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    context: '',
    query: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const fileInputRef = useRef(null);
  const [config, setConfig] = useState(defaultConfig);
  const [showApiKey, setShowApiKey] = useState(false);
  const [validApiKey, setValidApiKey] = useState(true);
  const [runtimeStats, setRuntimeStats] = useState(null);
  const [continueQueryMode, setContinueQueryMode] = useState(false);
  const [followUpQuery, setFollowUpQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      if (IS_DEVELOPMENT) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setTasks(mockTasks);
      } else {
        const data = await MinionService.getTasks();
        setTasks(data);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSelect = async (taskId) => {
    setShowNewTaskForm(false);
    try {
      setLoading(true);
      if (IS_DEVELOPMENT) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        const taskDetails = mockTasks.find(task => task.id === taskId);
        setSelectedTask(taskDetails);
        
        // Set mock runtime stats when a completed task is selected
        if (taskDetails.status === 'completed') {
          setRuntimeStats({
            setupTime: {
              value: 2.10,
              percentage: 2.2
            },
            executionTime: {
              value: 95.35,
              percentage: 97.8
            },
            tokenUsage: {
              local: {
                model: 'llama3.2',
                total: 72000,
                prompt: 70224,
                completion: 1776
              },
              remote: {
                model: 'gpt-4o',
                total: 11073,
                prompt: 8988,
                completion: 2085
              }
            }
          });
        } else {
          setRuntimeStats(null);
        }
      } else {
        const taskDetails = await MinionService.getTaskById(taskId);
        setSelectedTask(taskDetails);
      }
    } catch (err) {
      setError('Failed to fetch task details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (IS_DEVELOPMENT) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const newTaskWithId = {
          ...newTask,
          id: tasks.length + 1,
          status: 'pending',
          results: null,
          config: { ...config },
          fileName: uploadedFile ? uploadedFile.name : null
        };
        setTasks(prevTasks => [...prevTasks, newTaskWithId]);
      } else {
        // In a real implementation, you would create a FormData object
        // and append the file to it for upload to the backend
        const formData = new FormData();
        formData.append('name', newTask.name);
        formData.append('description', newTask.description);
        formData.append('context', newTask.context);
        formData.append('query', newTask.query);
        
        if (uploadedFile) {
          formData.append('file', uploadedFile);
        }
        
        // You would then send the formData to the backend
        // await MinionService.createTaskWithFile(formData);
        await MinionService.createTask({
          ...newTask,
          config: { ...config }
        });
        await fetchTasks(); // Refresh the task list
      }
      setShowNewTaskForm(false);
      setNewTask({ 
        name: '', 
        description: '',
        context: '',
        query: '' 
      });
      setUploadedFile(null);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setIsLoadingFile(true);
      setUploadedFile(file);
      
      // Read the file contents
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update the context field with the file contents
        setNewTask(prev => ({
          ...prev,
          context: event.target.result
        }));
        setIsLoadingFile(false);
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setIsLoadingFile(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Failed to process file');
      console.error(err);
      setIsLoadingFile(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleProtocol = (protocolId) => {
    setConfig(prev => ({
      ...prev,
      protocol: protocolId
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleContinueQuery = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (IS_DEVELOPMENT) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        
        // Create a new task that references the original
        const continuedTask = {
          id: tasks.length + 1,
          name: `${selectedTask.name} (follow-up)`,
          description: `Follow-up query to "${selectedTask.name}"`,
          status: 'pending',
          results: null,
          config: { ...selectedTask.config },
          context: selectedTask.context,
          query: followUpQuery,
          originalTaskId: selectedTask.id
        };
        
        setTasks(prevTasks => [...prevTasks, continuedTask]);
        setSelectedTask(continuedTask);
        setContinueQueryMode(false);
        setFollowUpQuery('');
      } else {
        // In production, call the API
        const continuedTask = await MinionService.createFollowUpTask({
          originalTaskId: selectedTask.id,
          query: followUpQuery
        });
        
        await fetchTasks();
        // Select the newly created task
        setSelectedTask(continuedTask);
        setContinueQueryMode(false);
        setFollowUpQuery('');
      }
    } catch (err) {
      setError('Failed to continue query');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'tasks'
              ? 'text-rose-600 border-b-2 border-rose-600 dark:text-rose-400 dark:border-rose-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'config'
              ? 'text-rose-600 border-b-2 border-rose-600 dark:text-rose-400 dark:border-rose-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('config')}
        >
          Configuration
        </button>
      </div>

      {activeTab === 'tasks' ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Minion Task Manager
            </h1>
            <button
              onClick={() => {
                setShowNewTaskForm(true);
                setSelectedTask(null);
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            >
              New Task
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Task List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Available Tasks
              </h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      selectedTask?.id === task.id ? 'border-rose-500 dark:border-rose-400' : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => handleTaskSelect(task.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{task.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Details or New Task Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {showNewTaskForm ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Create New Task
                  </h2>
                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                      <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Task Name
                      </label>
                      <input
                        type="text"
                        id="taskName"
                        value={newTask.name}
                        onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="taskDescription"
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows="2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Context File (Optional)
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-1">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".txt,.md,.js,.py,.html,.css,.json,.csv"
                          />
                          <div className="w-full px-3 py-2 border border-dashed rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 truncate">
                              {uploadedFile ? uploadedFile.name : 'Choose a file or drag & drop'}
                            </span>
                            <span className="text-sm text-rose-600 dark:text-rose-400">
                              Browse
                            </span>
                          </div>
                        </div>
                        {uploadedFile && (
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      {isLoadingFile && (
                        <div className="mt-2 flex items-center">
                          <div className="animate-spin h-4 w-4 border-b-2 border-rose-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Loading file...</span>
                        </div>
                      )}
                      {uploadedFile && (
                        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                          ✓ File loaded: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="taskContext" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Context
                      </label>
                      <textarea
                        id="taskContext"
                        value={newTask.context}
                        onChange={(e) => setNewTask(prev => ({ ...prev, context: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows="4"
                        placeholder={uploadedFile ? "Content loaded from file (you can edit if needed)" : "Add the context the model will use..."}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="taskQuery" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Query
                      </label>
                      <textarea
                        id="taskQuery"
                        value={newTask.query}
                        onChange={(e) => setNewTask(prev => ({ ...prev, query: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows="2"
                        placeholder="What question do you want to ask about the context?"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewTaskForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Creating...' : 'Create Task'}
                      </button>
                    </div>
                  </form>
                </>
              ) : selectedTask ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedTask.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedTask.description}
                    </p>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status}
                      </span>
                    </div>
                  </div>

                  {/* Query and Answer section */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">
                      🚀 Query
                    </h3>
                    <p className="text-blue-700 dark:text-blue-200">
                      {selectedTask.query || "Which Minion is crowned the King at Buckingham Palace?"}
                    </p>
                  </div>

                  {selectedTask.results && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="text-md font-medium text-green-800 dark:text-green-300 mb-2">
                        🎯 Final Answer
                      </h3>
                      <p className="text-green-700 dark:text-green-200">
                        {selectedTask.results.answer || "Bob"}
                      </p>
                    </div>
                  )}

                  {/* Continue Query section - only show for completed tasks */}
                  {selectedTask.status === 'completed' && (
                    continueQueryMode ? (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-3">
                          Continue with follow-up question
                        </h3>
                        <form onSubmit={handleContinueQuery}>
                          <textarea
                            value={followUpQuery}
                            onChange={(e) => setFollowUpQuery(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-3"
                            rows="2"
                            placeholder="Ask a follow-up question based on the previous answer..."
                            required
                          />
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => setContinueQueryMode(false)}
                              className="px-3 py-1 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                              disabled={loading}
                            >
                              {loading ? 'Submitting...' : 'Submit'}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => setContinueQueryMode(true)}
                          className="flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Continue Query
                        </button>
                      </div>
                    )
                  )}

                  {/* Runtime stats for completed tasks */}
                  {runtimeStats && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Runtime
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Setup Time</p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">{runtimeStats.setupTime.value.toFixed(2)}s</p>
                          <p className="text-sm text-green-600 dark:text-green-400">↑ {runtimeStats.setupTime.percentage.toFixed(1)}% of total</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Execution Time</p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">{runtimeStats.executionTime.value.toFixed(2)}s</p>
                          <p className="text-sm text-green-600 dark:text-green-400">↑ {runtimeStats.executionTime.percentage.toFixed(1)}% of total</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Token Usage
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {runtimeStats.tokenUsage.local.model} (Local) Total Tokens
                          </p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">
                            {runtimeStats.tokenUsage.local.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            ↑ Prompt: {runtimeStats.tokenUsage.local.prompt.toLocaleString()}, 
                            Completion: {runtimeStats.tokenUsage.local.completion.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {runtimeStats.tokenUsage.remote.model} (Remote) Total Tokens
                          </p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">
                            {runtimeStats.tokenUsage.remote.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            ↑ Prompt: {runtimeStats.tokenUsage.remote.prompt.toLocaleString()}, 
                            Completion: {runtimeStats.tokenUsage.remote.completion.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Select a task to view details or create a new task
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Minion Configuration
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              LLM Provider Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select LLM provider
                </label>
                <select 
                  value={config.provider}
                  onChange={(e) => handleConfigChange('provider', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {llmProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OpenAI API Key (optional if set in environment)
                </label>
                <div className="relative">
                  <input 
                    type={showApiKey ? "text" : "password"}
                    value={config.apiKey}
                    onChange={(e) => {
                      handleConfigChange('apiKey', e.target.value);
                      setValidApiKey(e.target.value.length > 10);
                    }}
                    className={`w-full px-3 py-2 border rounded-md ${
                      validApiKey 
                        ? 'dark:bg-gray-700 dark:border-gray-600' 
                        : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                    } dark:text-white pr-10`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {showApiKey ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
                {validApiKey && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    ✓ Valid API key. You're good to go!
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Protocol
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Communication protocol
            </p>
            
            <div className="flex space-x-4">
              {protocols.map(protocol => (
                <button
                  key={protocol.id}
                  className={`px-4 py-2 rounded-md ${
                    config.protocol === protocol.id
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-transparent'
                  }`}
                  onClick={() => toggleProtocol(protocol.id)}
                >
                  {protocol.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Model Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Local Model
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {localModels.map(model => (
                    <div 
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        config.localModel === model.id
                          ? 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleConfigChange('localModel', model.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{model.icon}</div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {model.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Provider: {model.provider}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Remote Model
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {remoteModels.map(model => (
                    <div 
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        config.remoteModel === model.id
                          ? 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleConfigChange('remoteModel', model.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{model.icon}</div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {model.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Provider: {model.provider}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 