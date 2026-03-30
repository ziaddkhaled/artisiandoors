'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { CartItem, CartState, CartContextValue } from '@/types';
import {
  cartReducer,
  calculateCartTotals,
  saveCartToStorage,
  loadCartFromStorage,
  clearCartStorage,
} from '@/lib/cart';

// ── Initial state ──────────────────────────────────────────────────────

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

// ── Context ────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const savedItems = loadCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedItems });
  }, []);

  // Debounced save to localStorage whenever items change (skip initial render)
  useEffect(() => {
    // Don't save until we've hydrated from localStorage
    if (!state.isHydrated) return;

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save by 300ms to avoid rapid writes
    saveTimeoutRef.current = setTimeout(() => {
      saveCartToStorage(state.items);
    }, 300);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.items, state.isHydrated]);

  // ── Action dispatchers ─────────────────────────────────────────────

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    // Immediately clear storage when explicitly clearing (no debounce)
    clearCartStorage();
  }, []);

  // ── Computed totals (memoized) ───────────────────────────────────

  const totals = useMemo(
    () => calculateCartTotals(state.items),
    [state.items]
  );

  // ── Context value (memoized) ───────────────────────────────────────

  const contextValue: CartContextValue = useMemo(
    () => ({
      ...state,
      ...totals,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state, totals, addItem, removeItem, updateQuantity, clearCart]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────

/**
 * Returns the cart context value.
 * Must be used within a CartProvider.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
