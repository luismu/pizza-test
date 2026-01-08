import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import { orderReducer, initialOrderState } from './orderReducer';
import { calculateLineDiscount } from '../utils/discount';
import type { OrderItem } from '../types';

interface OrderContextType {
    items: OrderItem[];
    addItem: (pizzaId: string, price: number, quantity: number) => void;
    removeItem: (pizzaId: string) => void;
    updateQuantity: (pizzaId: string, quantity: number) => void;
    clearOrder: () => void;
    totals: {
        subtotal: number;
        totalDiscount: number;
        total: number;
    };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(orderReducer, initialOrderState);

    const addItem = (pizzaId: string, price: number, quantity: number) => {
        dispatch({ type: 'ADD_ITEM', payload: { pizzaId, price, quantity } });
    };

    const removeItem = (pizzaId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: pizzaId });
    };

    const updateQuantity = (pizzaId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { pizzaId, quantity } });
    };

    const clearOrder = () => {
        dispatch({ type: 'CLEAR_ORDER' });
    };

    const totals = useMemo(() => {
        const subtotal = state.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
        const totalDiscount = state.items.reduce(
            (acc, item) => acc + calculateLineDiscount(item.unitPrice, item.quantity),
            0
        );
        return {
            subtotal,
            totalDiscount,
            total: subtotal - totalDiscount,
        };
    }, [state.items]);

    return (
        <OrderContext.Provider
            value={{
                items: state.items,
                addItem,
                removeItem,
                updateQuantity,
                clearOrder,
                totals,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrder must be used within an OrderProvider');
    return context;
};
