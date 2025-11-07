import React from 'react'
import PropTypes from 'prop-types'

/**
 * MongoIcons - Sistema de iconos SVG con estilo MongoDB
 *
 * Todos los iconos siguen el design system de MongoDB:
 * - MongoDB Green (#00ED64)
 * - Forest Green (#00684A)
 * - Slate (#001E2B)
 * - Diseños limpios y modernos
 */

// Base Icon Wrapper
const IconWrapper = ({ children, size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {children}
  </svg>
)

IconWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  className: PropTypes.string
}

// Bank Icon
export const BankIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path
      d="M12 2L2 7V9H22V7L12 2Z"
      fill="url(#bankGradient)"
    />
    <rect x="4" y="10" width="2.5" height="10" fill="#00ED64" />
    <rect x="8.5" y="10" width="2.5" height="10" fill="#00ED64" />
    <rect x="13" y="10" width="2.5" height="10" fill="#00ED64" />
    <rect x="17.5" y="10" width="2.5" height="10" fill="#00ED64" />
    <rect x="2" y="21" width="20" height="2" fill="#001E2B" />
    <defs>
      <linearGradient id="bankGradient" x1="12" y1="2" x2="12" y2="9" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00A846" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Fintech Icon
export const FintechIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#fintechGradient)" opacity="0.2" />
    <path
      d="M12 6V18M6 12H18M9 9L12 6L15 9M9 15L12 18L15 15"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="fintechGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Retail Icon
export const RetailIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#retailGradient)"
      opacity="0.3"
    />
    <path
      d="M9 22V12H15V22"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="retailGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Telecom Icon
export const TelecomIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="2" fill="#00ED64" />
    <circle cx="12" cy="12" r="6" stroke="#00ED64" strokeWidth="2" opacity="0.5" />
    <circle cx="12" cy="12" r="10" stroke="#00ED64" strokeWidth="1.5" opacity="0.3" />
    <path
      d="M12 2V4M12 20V22M2 12H4M20 12H22"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// Insurance Icon
export const InsuranceIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path
      d="M12 2L3 6V11C3 16 7 20.5 12 22C17 20.5 21 16 21 11V6L12 2Z"
      fill="url(#insuranceGradient)"
      opacity="0.3"
    />
    <path
      d="M12 2L3 6V11C3 16 7 20.5 12 22C17 20.5 21 16 21 11V6L12 2Z"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="insuranceGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Tech Icon
export const TechIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="#00ED64" strokeWidth="2" fill="url(#techGradient)" opacity="0.2" />
    <path d="M8 10L10 12L8 14M12 14H16" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="7" y="20" width="10" height="2" fill="#00ED64" rx="1" />
    <defs>
      <linearGradient id="techGradient" x1="12" y1="4" x2="12" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Document Icon (Premium)
export const DocumentIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      fill="url(#docGradient)"
      opacity="0.3"
    />
    <path
      d="M14 2V8H20"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 13H16M8 17H16M8 9H10"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="docGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Search Icon (Premium)
export const SearchIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="#00ED64"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 16L21 21"
      stroke="#00ED64"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// Location Icon (Premium)
export const LocationIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill="url(#locationGradient)"
      opacity="0.3"
    />
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      stroke="#00ED64"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="9"
      r="2.5"
      fill="#00ED64"
    />
    <defs>
      <linearGradient id="locationGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Industry Icon (Premium)
export const IndustryIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <rect x="3" y="12" width="4" height="10" fill="#00ED64" opacity="0.6" />
    <rect x="10" y="8" width="4" height="14" fill="#00ED64" opacity="0.8" />
    <rect x="17" y="4" width="4" height="18" fill="#00ED64" />
  </IconWrapper>
)

// Compare Icon (Premium)
export const CompareIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <rect x="2" y="7" width="8" height="14" rx="1" stroke="#00ED64" strokeWidth="2" fill="url(#compareGradient)" opacity="0.2" />
    <rect x="14" y="3" width="8" height="18" rx="1" stroke="#00ED64" strokeWidth="2" fill="url(#compareGradient2)" opacity="0.2" />
    <path d="M6 11H6.01M6 15H6.01M18 7H18.01M18 11H18.01M18 15H18.01" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="compareGradient" x1="6" y1="7" x2="6" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
      <linearGradient id="compareGradient2" x1="18" y1="3" x2="18" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00A846" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Architecture Icon (Premium)
export const ArchitectureIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#00ED64" strokeWidth="1.5" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#00ED64" strokeWidth="1.5" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#00ED64" strokeWidth="1.5" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#00ED64" strokeWidth="1.5" fill="none" />
    <path d="M6.5 10V14M17.5 10V14M10 6.5H14M10 17.5H14" stroke="#00ED64" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#00ED64" />
  </IconWrapper>
)

// AI/ML Icon (Premium)
export const AIIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="3" fill="url(#aiGradient)" />
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="aiGradient" x1="12" y1="9" x2="12" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00A846" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Integration Icon (Premium)
export const IntegrationIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="6" cy="12" r="3" stroke="#00ED64" strokeWidth="2" fill="none" />
    <circle cx="18" cy="6" r="3" stroke="#00ED64" strokeWidth="2" fill="none" />
    <circle cx="18" cy="18" r="3" stroke="#00ED64" strokeWidth="2" fill="none" />
    <path d="M9 12H15M15 9L18 9M15 15L18 15" stroke="#00ED64" strokeWidth="2" />
  </IconWrapper>
)

// Strategy Icon (Premium)
export const StrategyIcon = ({ size = 24, className = '' }) => (
  <IconWrapper size={size} className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#strategyGradient)" opacity="0.3" />
    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="strategyGradient" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ED64" />
        <stop offset="1" stopColor="#00684A" />
      </linearGradient>
    </defs>
  </IconWrapper>
)

// Export all icon prop types
BankIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

FintechIcon.propTypes = BankIcon.propTypes
RetailIcon.propTypes = BankIcon.propTypes
TelecomIcon.propTypes = BankIcon.propTypes
InsuranceIcon.propTypes = BankIcon.propTypes
TechIcon.propTypes = BankIcon.propTypes
DocumentIcon.propTypes = BankIcon.propTypes
SearchIcon.propTypes = BankIcon.propTypes
LocationIcon.propTypes = BankIcon.propTypes
IndustryIcon.propTypes = BankIcon.propTypes
CompareIcon.propTypes = BankIcon.propTypes
ArchitectureIcon.propTypes = BankIcon.propTypes
AIIcon.propTypes = BankIcon.propTypes
IntegrationIcon.propTypes = BankIcon.propTypes
StrategyIcon.propTypes = BankIcon.propTypes
