'use client';

import { api } from '@/lib/api';

/**
 * Utility functions for handling form submissions
 */

/**
 * Submit contact form data to the API
 */
export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  message?: string;
  projectType?: string;
}) {
  try {
    const response = await api.contact.create({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message?.trim() || '',
      projectType: formData.projectType || ''
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

/**
 * Upload a file with form data
 */
export async function uploadAssignment(file: File, formData: {
  name: string;
  email: string;
  phone: string;
  projectType?: string;
}) {
  try {
    const form = new FormData();
    form.append('file', file);
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    
    if (formData.projectType) {
      form.append('projectType', formData.projectType);
    }
    
    const response = await api.upload.create(form);
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error uploading assignment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate form fields
 */
export function validateForm(data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  projectType?: string;
  [key: string]: string | undefined;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
} 