import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MINION_API_URL || 'http://localhost:8000';

class MinionService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Get all available tasks
  async getTasks() {
    try {
      const response = await this.api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  // Get task details by ID
  async getTaskById(taskId) {
    try {
      const response = await this.api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task details:', error);
      throw error;
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await this.api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      const response = await this.api.patch(`/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  }

  // Get task results
  async getTaskResults(taskId) {
    try {
      const response = await this.api.get(`/tasks/${taskId}/results`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task results:', error);
      throw error;
    }
  }
}

const minionService = new MinionService();
export default minionService; 