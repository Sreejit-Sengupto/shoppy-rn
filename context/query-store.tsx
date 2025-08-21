import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface TQueryContext {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const QueryContext = createContext<TQueryContext | undefined>(undefined);

const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>('');

  const val = {
    query,
    setQuery,
  };

  return <QueryContext.Provider value={val}>{children}</QueryContext.Provider>;
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('Component must be wrapped inside the Query Context Provider');
  }
  return context;
};

export default QueryContextProvider;
