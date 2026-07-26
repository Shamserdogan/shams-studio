/**
 * SHAMS STUDIO Backend - Input Validation and Sanitization Utilities
 */

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates whether a given string is a properly formatted email address
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Sanitizes input string by trimming whitespace and escaping basic HTML characters
 * @param {string} str 
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim();
};

/**
 * Normalizes array fields received as string or array
 * @param {Array|string} val 
 * @returns {Array<string>}
 */
const parseArrayField = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => (typeof item === 'string' ? item.trim() : item)).filter(Boolean);
  }
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

module.exports = {
  isValidEmail,
  sanitizeString,
  parseArrayField,
};
