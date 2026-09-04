import Eyebrow from './Eyebrow';
import './SectionHeading.css';

/**
 * SectionHeading component for uniform high-contrast headlines across sections
 */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'left', // 'left', 'center', 'right'
  theme = 'light', // 'light', 'dark'
  className = '',
  titleAs: TitleTag = 'h2',
}) => {
  return (
    <div 
      className={`loom-section-heading loom-section-heading--align-${align} loom-section-heading--theme-${theme} ${className}`.trim()}
    >
      {eyebrow && (
        <Eyebrow variant={theme === 'dark' ? 'gold' : 'gold'}>
          {eyebrow}
        </Eyebrow>
      )}
      {title && (
        <TitleTag className="loom-section-heading__title">
          {title}
        </TitleTag>
      )}
      {subtitle && (
        <p className="loom-section-heading__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
