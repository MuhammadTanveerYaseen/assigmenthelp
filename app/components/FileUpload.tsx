'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FileUpload Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-800 font-semibold">Something went wrong</h3>
          <p className="text-red-600 mt-2">
            Please refresh the page and try again. If the problem persists, contact support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const FileUpload = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ url: string; filename: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // File validation
    if (!file) {
      errors.file = 'Please select a file to upload';
    }

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError('Please upload a PDF, DOC, DOCX, or TXT file');
      setFile(null);
      return;
    }
    
    if (selectedFile.size > maxSize) {
      setFileError('File size must be less than 10MB');
      setFile(null);
      return;
    }
    
    setFileError('');
    setFile(selectedFile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.valid) {
      setFormErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }
    
    if (!file) {
      setFileError('Please select a file to upload');
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('name', formData.name.trim());
      form.append('email', formData.email.trim());
      form.append('phone', formData.phone.trim());
      if (formData.projectType) {
        form.append('projectType', formData.projectType);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Upload failed');
      }

      setUploadedFile({
        url: data.data.document.url,
        filename: data.data.document.filename,
      });

      toast.success('Your assignment has been uploaded successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: ''
      });
      setFile(null);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    }
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <ErrorBoundary>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h3 className="text-gray-800 text-xl font-bold mb-4">Upload Your Assignment</h3>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your Name"
              disabled={isSubmitting}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your Phone Number"
              disabled={isSubmitting}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="projectType" className="block text-gray-700 mb-1">Project Type</label>
            <select 
              id="projectType" 
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              disabled={isSubmitting}
            >
              <option value="">Select Project Type</option>
              <option value="assignment">Assignment</option>
              <option value="final-year">Final Year Project</option>
              <option value="thesis">Thesis/Dissertation</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Upload File</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input {...getInputProps()} disabled={isSubmitting} />
              {isDragActive ? (
                <p className="text-blue-500">Drop the file here</p>
              ) : (
                <div>
                  <p className="text-gray-500">
                    Drag and drop a file here, or click to select a file
                  </p>
                  {file && (
                    <p className="text-green-600 mt-2">
                      Selected: {file.name} ({formatFileSize(file.size)})
                    </p>
                  )}
                </div>
              )}
            </div>
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Assignment'
            )}
          </button>
        </form>

        {isLoading && <LoadingSpinner />}

        {uploadedFile && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">File uploaded successfully!</p>
            <p className="text-sm text-gray-600 mt-1">
              Filename: {uploadedFile.filename}
            </p>
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm mt-2 inline-block"
            >
              View uploaded file
            </a>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FileUpload; 