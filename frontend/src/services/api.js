import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// API service for Story Master app
class ApiService {
  // User Progress API
  async getProgress() {
    try {
      const response = await axios.get(`${API}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error getting progress:', error);
      throw error;
    }
  }

  async updateProgress(progressData) {
    try {
      const response = await axios.put(`${API}/progress`, progressData);
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  // Stories API
  async getStories() {
    try {
      const response = await axios.get(`${API}/stories`);
      return response.data;
    } catch (error) {
      console.error('Error getting stories:', error);
      throw error;
    }
  }

  async createStory(storyData) {
    try {
      const response = await axios.post(`${API}/stories`, storyData);
      return response.data;
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  }

  async getStory(storyId) {
    try {
      const response = await axios.get(`${API}/stories/${storyId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting story:', error);
      throw error;
    }
  }

  async deleteStory(storyId) {
    try {
      const response = await axios.delete(`${API}/stories/${storyId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  }
}

export default new ApiService();