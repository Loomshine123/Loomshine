import './Container.css';

/**
 * Container component for enforcing layout constraints
 */
export const Container = ({
  children,
  size = 'lg', // 'sm', 'md', 'lg', 'full'
  noPadding = false,
  className = '',
  ...props
}) => {
  const sizeClass = `loom-container--${size}`;
  const paddingClass = noPadding ? 'loom-container--no-padding' : '';
  
  return (
    <div 
      className={`loom-container ${sizeClass} ${paddingClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
