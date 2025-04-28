import axios from 'axios';
import { JobOffer, SearchParams } from '../types';

const API_BASE_URL = 'https://api-firstjob.onrender.com';

// API client with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all job offers with optional search and filter params
export const getJobOffers = async (params?: SearchParams): Promise<JobOffer[]> => {
  try {
    const response = await apiClient.get('/job-offers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching job offers:', error);
    throw error;
  }
};

// Get a specific job offer by ID
export const getJobOfferById = async (id: string): Promise<JobOffer> => {
  try {
    const response = await apiClient.get(`/job-offers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job offer with ID ${id}:`, error);
    throw error;
  }
};

// Create a new job offer
export const createJobOffer = async (offerData: Partial<JobOffer>): Promise<JobOffer> => {
  try {
    const response = await apiClient.post('/job-offers', offerData);
    return response.data;
  } catch (error) {
    console.error('Error creating job offer:', error);
    throw error;
  }
};

// Update an existing job offer
export const updateJobOffer = async (id: string, offerData: Partial<JobOffer>): Promise<JobOffer> => {
  try {
    const response = await apiClient.put(`/job-offers/${id}`, offerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating job offer with ID ${id}:`, error);
    throw error;
  }
};

// Delete a job offer
export const deleteJobOffer = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/job-offers/${id}`);
  } catch (error) {
    console.error(`Error deleting job offer with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getJobOffers,
  getJobOfferById,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
};