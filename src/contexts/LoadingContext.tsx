import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
  withLoading: <T>(promise: Promise<T>, message?: string) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('loading...');

  const setLoading = (loading: boolean, message = 'loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  const withLoading = async <T,>(promise: Promise<T>, message = 'loading...'): Promise<T> => {
    setLoading(true, message);
    try {
      const result = await promise;
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, setLoading, withLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};