import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('loomshine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('loomshine_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    // Standardize price as a number
    const numericPrice = typeof product.price === 'number' 
      ? product.price 
      : parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 0;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem = {
          id: product.id,
          name: product.name || 'Garment Item',
          category: product.category || 'General',
          service: product.service || (product.category ? 'Dry Cleaning' : 'Garment Care'),
          price: numericPrice,
          unit: product.unit || 'per garment',
          image: product.image || null,
          quantity: Math.max(1, quantity),
        };
        return [...prevCart, newItem];
      }
    });

    setToast({
      message: `"${product.name || 'Item'}" added to your bag ✓`,
      item: product,
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        toast,
        dismissToast: () => setToast(null),
      }}
    >
      {children}

      {/* Floating Global Toast */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className="loom-cart-toast"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#071A33',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: '6px',
            boxShadow: '0 12px 32px rgba(4, 16, 33, 0.35)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            animation: 'fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span style={{ color: '#C5A059', fontWeight: 'bold' }}>✦</span>
          <span>{toast.message}</span>
          <a
            href="#/cart"
            style={{
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '4px 10px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.04em',
            }}
          >
            VIEW CART →
          </a>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8395A7',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
              padding: '0 4px',
            }}
          >
            ✕
          </button>
        </aside>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
