import { useMemo } from 'react';

export function useFormattedDate(options = {}) {
  return useMemo(() => {
    const defaultOptions = {
      weekday: 'long',    
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Date().toLocaleDateString('en-US', finalOptions);
  }, [options]);
}