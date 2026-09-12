import './Container.css';

/**
 * Container component for enforcing layout constraints
 */
export const Container = ({
  children,
  size = 'lg', // 'sm', 'md', 'lg', 'full'
  fluid = false,
  noPadding = false,
  className = '',
  ...props
}) => {
  const effectiveSize = fluid ? 'full' : size;
  const sizeClass = `loom-container--${effectiveSize}`;
  const fluidClass = fluid ? 'loom-container--fluid' : '';
  const paddingClass = noPadding ? 'loom-container--no-padding' : '';
  
  return (
    <div 
      className={`loom-container ${sizeClass} ${fluidClass} ${paddingClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
