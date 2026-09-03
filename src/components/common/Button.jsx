import './Button.css';

/**
 * Button primitive supporting actions, links, and dark/light variants
 */
export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'dark', 'dark-outline', 'text'
  size = 'md', // 'sm', 'md', 'lg'
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) => {
  const baseClasses = `loom-btn loom-btn--${variant} loom-btn--${size} ${fullWidth ? 'loom-btn--full' : ''} ${disabled ? 'loom-btn--disabled' : ''} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="loom-btn__icon">{icon}</span>}
      <span className="loom-btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="loom-btn__icon">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
