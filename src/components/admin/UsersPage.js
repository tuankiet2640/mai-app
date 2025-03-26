import React, { useState } from 'react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock users data from the dashboard
  const users = [
    { id: 'U1001', name: 'Alice Johnson', email: 'alice@example.com', plan: 'Pro', status: 'Active', tokenUsage: 450000, lastActive: '2023-06-07T14:32:21' },
    { id: 'U1002', name: 'Bob Smith', email: 'bob@example.com', plan: 'Basic', status: 'Active', tokenUsage: 380500, lastActive: '2023-06-07T09:15:43' },
    { id: 'U1003', name: 'Carol Davis', email: 'carol@example.com', plan: 'Provip', status: 'Active', tokenUsage: 325800, lastActive: '2023-06-06T18:22:10' },
    { id: 'U1004', name: 'David Wilson', email: 'david@example.com', plan: 'Bellow Basic', status: 'Inactive', tokenUsage: 290450, lastActive: '2023-06-07T11:45:32' },
    { id: 'U1005', name: 'Eva Brown', email: 'eva@example.com', plan: 'Pro', status: 'Active', tokenUsage: 275900, lastActive: '2023-06-07T16:08:55' },
    { id: 'U1006', name: 'Frank Miller', email: 'frank@example.com', plan: 'Basic', status: 'Active', tokenUsage: 243200, lastActive: '2023-06-07T12:30:15' },
    { id: 'U1007', name: 'Grace Taylor', email: 'grace@example.com', plan: 'Bellow Basic', status: 'Inactive', tokenUsage: 127600, lastActive: '2023-06-05T10:12:08' },
    { id: 'U1008', name: 'Henry Garcia', email: 'henry@example.com', plan: 'Provip', status: 'Active', tokenUsage: 512700, lastActive: '2023-06-07T14:50:22' },
    { id: 'U1009', name: 'Ivy Lee', email: 'ivy@example.com', plan: 'Basic', status: 'Active', tokenUsage: 175300, lastActive: '2023-06-07T08:24:43' },
    { id: 'U1010', name: 'Jack Martin', email: 'jack@example.com', plan: 'Pro', status: 'Active', tokenUsage: 398200, lastActive: '2023-06-06T21:18:36' }
  ];

  // Filter and search users
  const filteredUsers = users
    .filter(user => {
      if (filter === 'all') return true;
      return user.status.toLowerCase() === filter.toLowerCase();
    })
    .filter(user => {
      if (!searchTerm) return true;
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTokenUsage = (tokens) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(2)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const getBadgeColor = (plan) => {
    switch (plan) {
      case 'Bellow Basic': return 'bg-gray-100 text-gray-800';
      case 'Basic': return 'bg-blue-100 text-blue-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      case 'Provip': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user accounts, access, and permissions.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors">
            Add User
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="sm:w-64">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Export
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Bulk Actions
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Token Usage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(user.plan)}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTokenUsage(user.tokenUsage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(user.lastActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-rose-600 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-300 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button aria-current="page" className="z-10 bg-rose-50 dark:bg-rose-900/30 border-rose-500 dark:border-rose-400 text-rose-600 dark:text-rose-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 