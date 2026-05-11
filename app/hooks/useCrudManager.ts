/**
 * useCrudManager Hook
 * Provides reusable logic for CRUD operations with optimistic updates
 * Requirements: 2.3, 2.4, 3.3, 3.4, 4.4, 4.5, 10.1, 10.2, 10.3, 10.4, 10.5
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseCrudManagerOptions<T> {
  fetchFn: () => Promise<T[]>;
  createFn: (data: Partial<T>) => Promise<T>;
  updateFn: (id: string, data: Partial<T>) => Promise<T>;
  deleteFn: (id: string) => Promise<void>;
  onSuccess?: (action: 'create' | 'update' | 'delete') => void;
  onError?: (error: Error, action: 'create' | 'update' | 'delete') => void;
}

export interface UseCrudManagerReturn<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (data: Partial<T>) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  isSubmitting: boolean;
}

export function useCrudManager<T extends { id: string }>({
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  onSuccess,
  onError,
}: UseCrudManagerOptions<T>): UseCrudManagerReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch items on mount
  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFn();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Create operation with optimistic update
  const create = useCallback(
    async (data: Partial<T>) => {
      setIsSubmitting(true);
      setError(null);

      try {
        // Call API to create item
        const newItem = await createFn(data);

        // Optimistically add to local state
        setItems((prev) => [...prev, newItem]);

        // Call success callback
        if (onSuccess) {
          onSuccess('create');
        }

        // Refresh to ensure consistency
        await refresh();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create item');
        setError(error.message);

        // Call error callback
        if (onError) {
          onError(error, 'create');
        }

        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [createFn, onSuccess, onError, refresh]
  );

  // Update operation with optimistic update
  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      setIsSubmitting(true);
      setError(null);

      // Store previous state for rollback
      const previousItems = [...items];

      try {
        // Optimistically update local state
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...data } : item))
        );

        // Call API to update item
        const updatedItem = await updateFn(id, data);

        // Update with actual response
        setItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );

        // Call success callback
        if (onSuccess) {
          onSuccess('update');
        }

        // Refresh to ensure consistency
        await refresh();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update item');
        setError(error.message);

        // Rollback optimistic update
        setItems(previousItems);

        // Call error callback
        if (onError) {
          onError(error, 'update');
        }

        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [items, updateFn, onSuccess, onError, refresh]
  );

  // Delete operation with optimistic update
  const remove = useCallback(
    async (id: string) => {
      setIsSubmitting(true);
      setError(null);

      // Store previous state for rollback
      const previousItems = [...items];

      try {
        // Optimistically remove from local state
        setItems((prev) => prev.filter((item) => item.id !== id));

        // Call API to delete item
        await deleteFn(id);

        // Call success callback
        if (onSuccess) {
          onSuccess('delete');
        }

        // Refresh to ensure consistency
        await refresh();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete item');
        setError(error.message);

        // Rollback optimistic update
        setItems(previousItems);

        // Call error callback
        if (onError) {
          onError(error, 'delete');
        }

        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [items, deleteFn, onSuccess, onError, refresh]
  );

  return {
    items,
    isLoading,
    error,
    refresh,
    create,
    update,
    remove,
    isSubmitting,
  };
}
