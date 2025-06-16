import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { weatherService } from '@/services';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      // Debounce search suggestions
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
timeoutRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await weatherService.searchCities(query);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.cityName);
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <ApperIcon
            name="Search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5"
          />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-12 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 font-body text-surface-900 placeholder-surface-500"
          />
          <AnimatePresence>
            {query && (
              <Button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || loading) && (
          <div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden z-50"
          >
            {loading ? (
              <div className="px-4 py-3 text-surface-500 text-center">
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin inline mr-2" />
                Searching...
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={`${suggestion.cityName}-${suggestion.country}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-white/50 transition-colors flex items-center gap-3 border-b border-white/10 last:border-b-0"
                  >
                    <ApperIcon name="MapPin" className="w-4 h-4 text-surface-400" />
                    <div>
                      <div className="font-medium text-surface-900">
                        {suggestion.cityName}
                      </div>
                      <div className="text-sm text-surface-500">
                        {suggestion.country}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;