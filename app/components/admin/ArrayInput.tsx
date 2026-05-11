/**
 * ArrayInput Component
 * Manages array fields like technologies, highlights, and achievements
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */

'use client';

import React, { useState, KeyboardEvent } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

export interface ArrayInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
  maxItems?: number;
  validation?: (item: string) => string | undefined;
}

export function ArrayInput({
  value,
  onChange,
  label,
  placeholder = 'Add item...',
  maxItems,
  validation,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();

    // Clear previous error
    setError(null);

    // Check if input is empty
    if (!trimmedValue) {
      return;
    }

    // Check max items
    if (maxItems && value.length >= maxItems) {
      setError(`Maximum ${maxItems} items allowed`);
      return;
    }

    // Run custom validation if provided
    if (validation) {
      const validationError = validation(trimmedValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Add item to array
    onChange([...value, trimmedValue]);
    setInputValue('');
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const isMaxReached = maxItems ? value.length >= maxItems : false;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
        {maxItems && (
          <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
            ({value.length}/{maxItems})
          </span>
        )}
      </label>

      {/* Input field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isMaxReached}
          className={`flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-primary focus:border-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isMaxReached || !inputValue.trim()}
          className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Items list */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg group hover:bg-primary/20 transition-colors"
            >
              <span className="text-sm font-medium">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-0.5 hover:bg-primary/20 rounded transition-colors"
                aria-label={`Remove ${item}`}
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {value.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          No items added yet. Type and press Enter or click Add.
        </p>
      )}
    </div>
  );
}
