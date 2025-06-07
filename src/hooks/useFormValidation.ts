
import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'Este campo é obrigatório.';
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return null;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Deve ter pelo menos ${rule.minLength} caracteres.`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Deve ter no máximo ${rule.maxLength} caracteres.`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Formato inválido.';
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  const validateForm = (data: { [key: string]: any }): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError
  };
};

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[\d\s\-()]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
};

// Common validation rules
export const commonRules = {
  email: {
    required: true,
    pattern: validationPatterns.email,
    custom: (value: string) => {
      if (value && !validationPatterns.email.test(value)) {
        return 'Por favor, insira um email válido.';
      }
      return null;
    }
  },
  password: {
    required: true,
    minLength: 6,
    custom: (value: string) => {
      if (value && value.length < 6) {
        return 'A palavra-passe deve ter pelo menos 6 caracteres.';
      }
      return null;
    }
  },
  phone: {
    pattern: validationPatterns.phone,
    custom: (value: string) => {
      if (value && !validationPatterns.phone.test(value)) {
        return 'Por favor, insira um número de telefone válido.';
      }
      return null;
    }
  }
};
