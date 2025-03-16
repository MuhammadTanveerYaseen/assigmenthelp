/**
 * Validates an email address format
 * @param email The email address to validate
 * @returns boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number format
 * Supports international formats with optional country code
 * @param phone The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters except + for country code
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Basic validation: at least 10 digits
  if (cleaned.length < 10) return false;
  
  // If starts with +, ensure it's followed by country code
  if (cleaned.startsWith('+')) {
    return /^\+\d{1,3}\d{10,}$/.test(cleaned);
  }
  
  // If no country code, ensure it's at least 10 digits
  return /^\d{10,}$/.test(cleaned);
} 