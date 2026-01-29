/**
 * Comprehensive input validation utilities
 * Provides type-safe validation for API requests without external dependencies
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  errors?: ValidationError[];
  data?: any;
}

/**
 * Base validator class
 */
export class Validator {
  private errors: ValidationError[] = [];

  /**
   * Add a validation error
   */
  addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  /**
   * Check if validation has errors
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Get all validation errors
   */
  getErrors(): ValidationError[] {
    return this.errors;
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Validate required field
   */
  required(value: any, fieldName: string): boolean {
    if (value === undefined || value === null || value === '') {
      this.addError(fieldName, `${fieldName} is required`);
      return false;
    }
    return true;
  }

  /**
   * Validate email format
   */
  email(value: string, fieldName: string = 'email'): boolean {
    if (!value) return true; // Skip if empty (use required() separately)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      this.addError(fieldName, `${fieldName} must be a valid email address`);
      return false;
    }
    return true;
  }

  /**
   * Validate phone number (international format)
   */
  phone(value: string, fieldName: string = 'phone'): boolean {
    if (!value) return true;

    // Allow international formats: +country code, spaces, dashes, parentheses
    // Minimum 7 digits, maximum 15 (ITU-T E.164)
    const cleaned = value.replace(/[\s\-().]/g, '');
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(cleaned)) {
      this.addError(fieldName, `${fieldName} must be a valid phone number`);
      return false;
    }
    return true;
  }

  /**
   * Validate string length
   */
  length(value: string, min: number, max: number, fieldName: string): boolean {
    if (!value) return true;

    if (value.length < min || value.length > max) {
      this.addError(fieldName, `${fieldName} must be between ${min} and ${max} characters`);
      return false;
    }
    return true;
  }

  /**
   * Validate minimum length
   */
  minLength(value: string, min: number, fieldName: string): boolean {
    if (!value) return true;

    if (value.length < min) {
      this.addError(fieldName, `${fieldName} must be at least ${min} characters`);
      return false;
    }
    return true;
  }

  /**
   * Validate maximum length
   */
  maxLength(value: string, max: number, fieldName: string): boolean {
    if (!value) return true;

    if (value.length > max) {
      this.addError(fieldName, `${fieldName} must not exceed ${max} characters`);
      return false;
    }
    return true;
  }

  /**
   * Validate numeric value
   */
  numeric(value: any, fieldName: string): boolean {
    if (value === undefined || value === null) return true;

    if (isNaN(Number(value))) {
      this.addError(fieldName, `${fieldName} must be a number`);
      return false;
    }
    return true;
  }

  /**
   * Validate integer value
   */
  integer(value: any, fieldName: string): boolean {
    if (value === undefined || value === null) return true;

    if (!Number.isInteger(Number(value))) {
      this.addError(fieldName, `${fieldName} must be an integer`);
      return false;
    }
    return true;
  }

  /**
   * Validate range
   */
  range(value: number, min: number, max: number, fieldName: string): boolean {
    if (value === undefined || value === null) return true;

    if (value < min || value > max) {
      this.addError(fieldName, `${fieldName} must be between ${min} and ${max}`);
      return false;
    }
    return true;
  }

  /**
   * Validate enum value
   */
  enum(value: any, allowedValues: any[], fieldName: string): boolean {
    if (!value) return true;

    if (!allowedValues.includes(value)) {
      this.addError(fieldName, `${fieldName} must be one of: ${allowedValues.join(', ')}`);
      return false;
    }
    return true;
  }

  /**
   * Validate URL format
   */
  url(value: string, fieldName: string = 'url'): boolean {
    if (!value) return true;

    try {
      new URL(value);
      return true;
    } catch {
      this.addError(fieldName, `${fieldName} must be a valid URL`);
      return false;
    }
  }

  /**
   * Validate date format
   */
  date(value: string, fieldName: string = 'date'): boolean {
    if (!value) return true;

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      this.addError(fieldName, `${fieldName} must be a valid date`);
      return false;
    }
    return true;
  }

  /**
   * Validate boolean value
   */
  boolean(value: any, fieldName: string): boolean {
    if (value === undefined || value === null) return true;

    if (typeof value !== 'boolean' && value !== 'true' && value !== 'false' && value !== 0 && value !== 1) {
      this.addError(fieldName, `${fieldName} must be a boolean value`);
      return false;
    }
    return true;
  }

  /**
   * Validate alphanumeric string
   */
  alphanumeric(value: string, fieldName: string): boolean {
    if (!value) return true;

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(value)) {
      this.addError(fieldName, `${fieldName} must contain only letters and numbers`);
      return false;
    }
    return true;
  }

  /**
   * Custom regex validation
   */
  regex(value: string, pattern: RegExp, fieldName: string, message?: string): boolean {
    if (!value) return true;

    if (!pattern.test(value)) {
      this.addError(fieldName, message || `${fieldName} format is invalid`);
      return false;
    }
    return true;
  }

  /**
   * Validate GST number (Indian)
   */
  gst(value: string, fieldName: string = 'GST'): boolean {
    if (!value) return true;

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(value)) {
      this.addError(fieldName, `${fieldName} must be a valid GST number`);
      return false;
    }
    return true;
  }

  /**
   * Validate PAN number (Indian)
   */
  pan(value: string, fieldName: string = 'PAN'): boolean {
    if (!value) return true;

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) {
      this.addError(fieldName, `${fieldName} must be a valid PAN number`);
      return false;
    }
    return true;
  }

  /**
   * Sanitize string (remove HTML tags and trim)
   */
  sanitize(value: string): string {
    if (!value) return value;

    return value
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim();
  }

  /**
   * Validate and return result
   */
  validate(data: any): ValidationResult {
    if (this.hasErrors()) {
      return {
        success: false,
        errors: this.getErrors()
      };
    }

    return {
      success: true,
      data
    };
  }
}

/**
 * Pre-defined validation schemas for common entities
 */
export const ValidationSchemas = {
  /**
   * Contact form validation
   */
  contactForm(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.name, 'name');
    validator.length(data.name, 2, 100, 'name');

    validator.required(data.email, 'email');
    validator.email(data.email, 'email');

    if (data.phone) {
      validator.phone(data.phone, 'phone');
    }

    if (data.company) {
      validator.maxLength(data.company, 200, 'company');
    }

    validator.required(data.message, 'message');
    validator.length(data.message, 10, 5000, 'message');

    // Sanitize inputs
    const sanitizedData = {
      name: validator.sanitize(data.name),
      email: validator.sanitize(data.email),
      phone: data.phone ? validator.sanitize(data.phone) : undefined,
      company: data.company ? validator.sanitize(data.company) : undefined,
      message: validator.sanitize(data.message),
      labelFinderData: data.labelFinderData,
    };

    return validator.validate(sanitizedData);
  },

  /**
   * Lead validation
   */
  lead(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.name, 'name');
    validator.length(data.name, 2, 200, 'name');

    validator.required(data.email, 'email');
    validator.email(data.email, 'email');

    if (data.phone) {
      validator.phone(data.phone, 'phone');
    }

    if (data.company) {
      validator.maxLength(data.company, 200, 'company');
    }

    if (data.stage) {
      validator.enum(data.stage, ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'], 'stage');
    }

    if (data.status) {
      validator.enum(data.status, ['ACTIVE', 'INACTIVE', 'CONVERTED', 'DISQUALIFIED'], 'status');
    }

    if (data.gstNumber) {
      validator.gst(data.gstNumber, 'gstNumber');
    }

    if (data.leadScore !== undefined) {
      validator.range(data.leadScore, 0, 100, 'leadScore');
    }

    return validator.validate(data);
  },

  /**
   * Opportunity validation
   */
  opportunity(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.name, 'name');
    validator.length(data.name, 3, 200, 'name');

    validator.required(data.value, 'value');
    validator.numeric(data.value, 'value');

    if (data.probability !== undefined) {
      validator.range(data.probability, 0, 100, 'probability');
    }

    if (data.stage) {
      validator.enum(data.stage, ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'], 'stage');
    }

    if (data.status) {
      validator.enum(data.status, ['OPEN', 'WON', 'LOST', 'ABANDONED'], 'status');
    }

    if (data.expectedCloseDate) {
      validator.date(data.expectedCloseDate, 'expectedCloseDate');
    }

    return validator.validate(data);
  },

  /**
   * Activity validation
   */
  activity(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.type, 'type');
    validator.enum(data.type, ['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'DEMO', 'FOLLOW_UP'], 'type');

    validator.required(data.subject, 'subject');
    validator.length(data.subject, 3, 200, 'subject');

    if (data.status) {
      validator.enum(data.status, ['PENDING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'], 'status');
    }

    if (data.scheduledFor) {
      validator.date(data.scheduledFor, 'scheduledFor');
    }

    if (data.duration !== undefined) {
      validator.range(data.duration, 1, 1440, 'duration'); // 1 min to 24 hours
    }

    return validator.validate(data);
  },

  /**
   * Admin user validation
   */
  adminUser(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.email, 'email');
    validator.email(data.email, 'email');

    validator.required(data.name, 'name');
    validator.length(data.name, 2, 100, 'name');

    if (data.password) {
      validator.minLength(data.password, 8, 'password');
    }

    if (data.role) {
      validator.enum(data.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_REP', 'MARKETING_MANAGER', 'MARKETING_REP', 'ACCOUNTANT', 'VIEWER'], 'role');
    }

    if (data.phone) {
      validator.phone(data.phone, 'phone');
    }

    return validator.validate(data);
  },

  /**
   * Invoice validation
   */
  invoice(data: any): ValidationResult {
    const validator = new Validator();

    validator.required(data.customerId, 'customerId');
    validator.integer(data.customerId, 'customerId');

    if (data.type) {
      validator.enum(data.type, ['INVOICE', 'QUOTE', 'PROFORMA'], 'type');
    }

    if (data.status) {
      validator.enum(data.status, ['DRAFT', 'SENT', 'PAID', 'PARTIALLY_PAID', 'OVERDUE', 'CANCELLED'], 'status');
    }

    validator.required(data.dueDate, 'dueDate');
    validator.date(data.dueDate, 'dueDate');

    if (data.subtotal !== undefined) {
      validator.numeric(data.subtotal, 'subtotal');
    }

    if (data.tax !== undefined) {
      validator.numeric(data.tax, 'tax');
      validator.range(data.tax, 0, 100, 'tax');
    }

    return validator.validate(data);
  },
};

/**
 * Middleware factory for Next.js API routes
 */
export function validateRequest(schema: (data: any) => ValidationResult) {
  return async (data: any) => {
    const result = schema(data);

    if (!result.success) {
      return {
        isValid: false,
        errors: result.errors,
        status: 400
      };
    }

    return {
      isValid: true,
      data: result.data
    };
  };
}
