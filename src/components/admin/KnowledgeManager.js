import React, { useState } from 'react';
import {
  useGetKnowledgeBasesQuery,
  useCreateKnowledgeBaseMutation,
  useGetKnowledgeBaseQuery,
  useIngestDocumentsMutation,
  useAddRawTextDocumentMutation,
} from '../../features/api/knowledgeApi';

// Simple icon for knowledge base
function KnowledgeBaseIcon() {
  return (
    <svg className="inline mr-2 w-5 h-5 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" opacity="0.1" />
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" />
      <path d="M8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
    </svg>
  );
}

function FileUpload({ kbId }) {
  const [ingestDocuments, { isLoading, error, isSuccess }] = useIngestDocumentsMutation();
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    await ingestDocuments({ kbId, formData }).unwrap();
    setFiles([]);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="file" multiple onChange={handleChange} />
      <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {isSuccess && <div className="text-green-600">Upload successful!</div>}
      {error && <div className="text-red-600">{error.error || 'Upload failed'}</div>}
    </form>
  );
}

function RawTextForm({ kbId }) {
  const [addRawTextDocument, { isLoading, error, isSuccess }] = useAddRawTextDocumentMutation();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await addRawTextDocument({ kbId, body: { title, text } }).unwrap();
    setText('');
    setTitle('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <textarea
        placeholder="Paste raw text here..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        className="border rounded px-2 py-1"
        required
      />
      <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Document'}
      </button>
      {isSuccess && <div className="text-green-600">Document added!</div>}
      {error && <div className="text-red-600">{error.error || 'Failed to add document'}</div>}
    </form>
  );
}

export default function KnowledgeManager() {
  const { data: kbList = [], isLoading, error, refetch } = useGetKnowledgeBasesQuery();
  const [createKnowledgeBase] = useCreateKnowledgeBaseMutation();
  const [selectedKbId, setSelectedKbId] = useState(null);
  const { data: kbDetails } = useGetKnowledgeBaseQuery(selectedKbId, { skip: !selectedKbId });

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;
    await createKnowledgeBase({ name }).unwrap();
    setName('');
    setCreating(false);
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Knowledge Bases</h1>
      <div className="mb-6 flex items-center gap-4">
        <button
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
          onClick={() => setCreating((v) => !v)}
        >
          + New Knowledge Base
        </button>
        {creating && (
          <form className="flex gap-2" onSubmit={handleCreate}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Knowledge Base Name"
              className="border rounded px-2 py-1"
              required
            />
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Create</button>
          </form>
        )}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error.error || error.toString()}</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kbList.map((kb) => (
              <tr key={kb.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{kb.id}</td>
                <td className="px-4 py-2">
                  <KnowledgeBaseIcon />
                  {kb.name}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => setSelectedKbId(kb.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedKbId && kbDetails && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Knowledge Base Details</h2>
          <div><strong>ID:</strong> {kbDetails.id}</div>
          <div><strong>Name:</strong> {kbDetails.name}</div>

          {/* File Upload (Ingest) */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Ingest Documents (File Upload)</h3>
            <FileUpload kbId={selectedKbId} />
          </div>

          {/* Raw Text Document */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Add Raw Text Document</h3>
            <RawTextForm kbId={selectedKbId} />
          </div>
        </div>
      )}
    </div>
  );
}
