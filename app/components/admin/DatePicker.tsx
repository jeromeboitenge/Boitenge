/**
 * DatePicker Component
 * Wrapper around react-datepicker with consistent styling
 * Requirements: 5.6, 13.4, 13.5, 14.3, 14.4
 */

'use client';

import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  required?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date...',
  minDate,
  maxDate,
  error,
  required = false,
}: DatePickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          dateFormat="MMMM d, yyyy"
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          className={`w-full px-4 py-2.5 pl-10 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-primary focus:border-primary'
          }`}
          wrapperClassName="w-full"
          calendarClassName="dark:bg-slate-800 dark:border-slate-700"
        />
        <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
