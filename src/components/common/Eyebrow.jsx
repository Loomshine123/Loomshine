import './Eyebrow.css';

/**
 * Eyebrow component for section category labels
 */
export const Eyebrow = ({
  children,
  variant = 'gold', // 'gold', 'navy', 'light', 'muted'
  className = '',
  as: Component = 'span',
  ...props
}) => {
  return (
    <Component 
      className={`loom-eyebrow loom-eyebrow--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Eyebrow;
