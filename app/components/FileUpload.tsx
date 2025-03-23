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

  // Add useEffect for discount toast on load
  React.useEffect(() => {
    toast.info(
      <div className="text-center">
        <h3 className="font-bold text-lg mb-2">🎉 Special Offer!</h3>
        <p>Get 20% off on your first assignment submission</p>
      </div>,
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  }, []);

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
      toast.error("Please fix the errors in the form", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    
    if (!file) {
      setFileError('Please select a file to upload');
      toast.error("Please select a file to upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      // Create a detailed message for WhatsApp with form values
      const whatsappMessage = `New Assignment Submission\n\n` +
        `📝 Assignment Details:\n` +
        `Name: ${formData.name.trim()}\n` +
        `Email: ${formData.email.trim()}\n` +
        `Phone: ${formData.phone.trim()}\n` +
        `Project Type: ${formData.projectType}\n\n` +
        `📄 File Information:\n` +
        `Filename: ${file.name}\n` +
        `File Size: ${formatFileSize(file.size)}\n` +
        `File Type: ${file.type}\n\n` +
        `🎉 Special Offer: 20% off on your first assignment!\n\n` +
        `⚠️ Please follow these steps:\n` +
        `1. Click the attachment icon (📎) in WhatsApp\n` +
        `2. Select "Document" or "File"\n` +
        `3. Choose the file: ${file.name}\n` +
        `4. Send the message with the file attached`;

      // Create WhatsApp URL with the message
      const whatsappUrl = `https://wa.me/923236229684?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Set uploaded file state for UI feedback
      setUploadedFile({
        url: URL.createObjectURL(file),
        filename: file.name,
      });

      toast.success('WhatsApp opened! Please attach the file and send the message.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: ''
      });
      setFile(null);
      setFileError('');
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFileError(errorMessage);
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
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Header with Discount Banner */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">🎉 Special Offer!</h2>
              <p className="text-lg">Get 20% off on your first assignment submission</p>
            </div>
          </div>

          {/* Header */}
          <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Assignment</h3>
                <p className="text-gray-600">Please fill in your details and attach your assignment file</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with padding for fixed header */}
        <div className="container mx-auto px-4 pt-48 pb-8">
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
              theme="colored"
            />

            {/* Discount Card */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">🎉 First Assignment Discount</h3>
                  <p className="text-lg">Get 20% off on your first assignment submission</p>
                  <p className="text-sm mt-2">Limited time offer!</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">20%</div>
                  <div className="text-sm">OFF</div>
                </div>
              </div>
            </div>
        
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
                <p className="text-green-700">Assignment details sent successfully!</p>
            <p className="text-sm text-gray-600 mt-1">
              Filename: {uploadedFile.filename}
            </p>
            <div className="mt-2 space-x-2">
                  <button
                    onClick={() => {
                      const whatsappMessage = `New Assignment Submission\n\n` +
                        `📝 Assignment Details:\n` +
                        `Name: ${formData.name}\n` +
                        `Email: ${formData.email}\n` +
                        `Phone: ${formData.phone}\n` +
                        `Project Type: ${formData.projectType}\n\n` +
                        `📄 File Information:\n` +
                        `Filename: ${uploadedFile.filename}\n\n` +
                        `Please check the attached file.`;
                      const whatsappUrl = `https://wa.me/923236229684?text=${encodeURIComponent(whatsappMessage)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="text-green-500 hover:underline text-sm inline-block"
                  >
                    Resend on WhatsApp
                  </button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FileUpload; 