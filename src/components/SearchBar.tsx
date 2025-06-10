import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto mb-4">
      <input
        type="search"
        className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        placeholder={placeholder || 'Buscar casos, documentos ou clientes...'}
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Buscar"
      />
      <button
        type="submit"
        className="bg-primary-800 text-white px-4 py-2 rounded-r hover:bg-primary-700"
        aria-label="Buscar"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
