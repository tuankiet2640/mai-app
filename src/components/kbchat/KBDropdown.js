import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKnowledgeBases } from '../../features/rag/ragSlice';

/**
 * KBDropdown - Reusable dropdown for selecting a Knowledge Base (Redux version)
 *
 * @param {Object} props
 * @param {string} value - currently selected KB id
 * @param {function} onChange - called with new KB object when selection changes
 * @param {string} className - additional classes for styling
 * @param {boolean} disabled - disable the dropdown
 * @param {boolean} autoSelectFirst - if true, auto-select first KB and call onChange
 */
export default function KBDropdown({ value, onChange, className = '', disabled = false, autoSelectFirst = true }) {
  const dispatch = useDispatch();
  const rag = useSelector(state => state.rag);
  const kbList = rag?.knowledgeBases || [];
  const loading = rag?.kbStatus === 'loading';
  const error = rag?.kbError;
  const ragMissing = !rag;

  // Fetch on mount
  useEffect(() => {
    if (!ragMissing && (!kbList || kbList.length === 0)) {
      dispatch(fetchKnowledgeBases());
    }
    // eslint-disable-next-line
  }, [ragMissing]);

  // Auto-select first KB if needed
  useEffect(() => {
    if (!ragMissing && autoSelectFirst && kbList && kbList.length > 0 && !value) {
      onChange && onChange(kbList[0]);
    }
    // eslint-disable-next-line
  }, [kbList, autoSelectFirst, ragMissing]);

  if (ragMissing) return <span className="text-red-500">Knowledge Base state not found. Redux slice 'rag' missing.</span>;
  if (loading) return <span>Loading KBs...</span>;
  if (error) return <span className="text-red-500">{error}</span>;
  if (!kbList || kbList.length === 0) return <span className="text-red-500">No Knowledge Bases found.</span>;

  return (
    <select
      value={value || ''}
      onChange={e => {
        const kb = kbList.find(kb => kb.id === e.target.value);
        onChange && onChange(kb);
      }}
      className={`border rounded px-2 py-1 dark:bg-gray-800 dark:text-white ${className}`}
      aria-label="Select Knowledge Base"
      disabled={disabled}
    >
      {kbList.map(kb => (
        <option key={kb.id} value={kb.id}>{kb.name}</option>
      ))}
    </select>
  );
}
