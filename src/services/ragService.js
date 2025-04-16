// ragService.js
// Service for interacting with rag-service (knowledge base, ingestion, RAG chat)
import { ragApi } from '../api/axiosInstance';

/**
 * Normalize axios error to a user-friendly format
 * @param {any} error
 * @returns {Error}
 */
function normalizeError(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return new Error(error.response.data.message);
  }
  if (error.response && error.response.data) {
    return new Error(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
  }
  return new Error(error.message || 'Unknown error');
}

/**
 * RAG Service - all methods return promises and are ready for redux/toolkit/react-query usage
 */
class RagService {
  /**
   * List all knowledge bases
   * @returns {Promise<Array>} Array of knowledge base objects
   */
  async listKnowledgeBases() {
    try {
      console.log('[ragService] GET /knowledge_bases/');
      const res = await ragApi.get('/knowledge_bases/');
      console.log('[ragService] Response:', res);
      return res.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Create a new knowledge base
   * @param {object} data { name, description, ai_provider }
   * @returns {Promise<object>} Created knowledge base
   */
  async createKnowledgeBase(data) {
    try {
      console.log('[ragService] POST /knowledge_bases/', data);
      const res = await ragApi.post('/knowledge_bases/', data);
      console.log('[ragService] Response:', res);
      return res.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Ingest documents into a knowledge base (multipart upload)
   * @param {string} kbId
   * @param {File[]} files
   * @returns {Promise<object>} Ingestion result
   */
  async ingestDocuments(kbId, files) {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      console.log(`[ragService] POST /knowledge_bases/${kbId}/ingest`, formData);
      const res = await ragApi.post(`/knowledge_bases/${kbId}/ingest`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('[ragService] Response:', res);
      return res.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Query a knowledge base (RAG chat)
   * @param {string} kbId
   * @param {string} query
   * @returns {Promise<object>} Query result
   */
  async queryKnowledgeBase(kbId, query) {
    try {
      console.log(`[ragService] POST /knowledge_bases/${kbId}/chat`, { query });
      const res = await ragApi.post(`/knowledge_bases/${kbId}/chat`, { query });
      console.log('[ragService] Response:', res);
      return res.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Health check
   * @returns {Promise<object>} Health status
   */
  async healthCheck() {
    try {
      console.log('[ragService] GET /knowledge_bases/health');
      const res = await ragApi.get('/knowledge_bases/health');
      console.log('[ragService] Response:', res);
      return res.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}

const ragService = new RagService();
export default ragService;
