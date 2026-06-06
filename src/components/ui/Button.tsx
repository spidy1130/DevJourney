import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20',
    outline: 'border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  // Since I am using Vanilla CSS tokens, I will map these to specific styles in a module or just class names.
  // However, I will use CSS variables in the component's style or a separate CSS module.
  
  return (
    <button 
      className={[ `btn-${variant}`, `btn-${size}`, fullWidth ? 'w-full' : '', className ].filter(Boolean).join(' ')}
      style={{
        padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '16px 32px' : '12px 24px',
        borderRadius: 'var(--radius-md)',
        fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
        ...(variant === 'primary' && {
          backgroundColor: 'var(--accent-emerald)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
        }),
        ...(variant === 'secondary' && {
          backgroundColor: 'var(--accent-blue)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
        }),
        ...(variant === 'outline' && {
          backgroundColor: 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--text-main)',
        }),
        ...(variant === 'ghost' && {
          backgroundColor: 'transparent',
          color: 'var(--text-muted)',
        }),
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
