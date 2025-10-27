"use client";

// Helper function to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', // 'primary', 'secondary', 'accent', 'error', 'ghost'
  size = 'md',        // 'sm', 'md', 'lg'
  className = '',     // For any additional custom classes
  disabled = false,
  type = 'button'
}) {

  // --- Base Styles ---
  const baseStyles = 'font-bold rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

  // --- Variant Styles ---
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/30',
    accent: 'bg-accent text-neutral-900 hover:bg-accent/90 shadow-lg shadow-accent/30',
    error: 'bg-error text-white hover:bg-error/90 shadow-lg shadow-error/30',
    ghost: 'bg-transparent text-gray-300 hover:bg-neutral-700/50',
    outline: 'bg-transparent border border-neutral-700 text-gray-300 hover:bg-neutral-800'
  };

  // --- Size Styles ---
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-lg'
  };
  
  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}