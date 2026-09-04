import { useId } from 'react';
import './Input.css';

/**
 * Accessible Input primitive with label, action button, and message container
 */
export const Input = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  successMessage,
  helperText,
  required = false,
  disabled = false,
  theme = 'light', // 'light', 'dark'
  actionButton,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || name || generatedId;

  return (
    <div className={`loom-input-group loom-input-group--${theme} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="loom-input-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`loom-input-wrapper ${error ? 'loom-input-wrapper--error' : ''}`}>
        <input
          id={inputId}
          name={name || inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className="loom-input-field"
          {...props}
        />
        {actionButton && <div className="loom-input-action">{actionButton}</div>}
      </div>

      {error && (
        <div id={`${inputId}-error`} className="loom-input-message loom-input-message--error" role="alert">
          {error}
        </div>
      )}

      {successMessage && !error && (
        <div className="loom-input-message loom-input-message--success">
          {successMessage}
        </div>
      )}

      {helperText && !error && !successMessage && (
        <div id={`${inputId}-helper`} className="loom-input-message text-muted">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;
