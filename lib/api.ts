const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  data: {
    document: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      projectType: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
      cloudinaryId: string;
      createdAt: string;
    };
  };
}

export interface Upload {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  cloudinaryId: string;
  createdAt: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

export const api = {
  // User API
  users: {
    getAll: async (): Promise<User[]> => {
      const response = await fetch(`${API_URL}/users`);
      return handleResponse(response);
    },
    getById: async (id: string): Promise<User> => {
      const response = await fetch(`${API_URL}/users/${id}`);
      return handleResponse(response);
    },
    create: async (userData: Omit<User, '_id' | 'createdAt'>): Promise<User> => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    update: async (id: string, userData: Partial<User>): Promise<User> => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  // Contact API
  contact: {
    getAll: async (): Promise<Contact[]> => {
      const response = await fetch(`${API_URL}/contact`);
      return handleResponse(response);
    },
    create: async (contactData: Omit<Contact, '_id' | 'createdAt'>): Promise<Contact> => {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  // Upload API
  upload: {
    getAll: async (): Promise<Upload[]> => {
      const response = await fetch(`${API_URL}/upload`);
      return handleResponse(response);
    },
    getById: async (id: string): Promise<Upload> => {
      const response = await fetch(`${API_URL}/upload/${id}`);
      return handleResponse(response);
    },
    create: async (formData: FormData): Promise<UploadResponse> => {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/upload/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },
}; 