import { describe, it, expect } from 'vitest';
import { orderReducer, initialOrderState } from '../state/orderReducer';

describe('Order Reducer', () => {
    it('should add a new item to the order', () => {
        const action = {
            type: 'ADD_ITEM' as const,
            payload: { pizzaId: '1', price: 10, quantity: 1 }
        };
        const newState = orderReducer(initialOrderState, action);
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0]).toEqual({
            pizzaId: '1',
            unitPrice: 10,
            quantity: 1
        });
    });

    it('should merge quantities if the same item is added again', () => {
        const stateWithOneItem = {
            items: [{ pizzaId: '1', unitPrice: 10, quantity: 1 }]
        };
        const action = {
            type: 'ADD_ITEM' as const,
            payload: { pizzaId: '1', price: 10, quantity: 2 }
        };
        const newState = orderReducer(stateWithOneItem, action);
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(3);
    });

    it('should remove an item from the order', () => {
        const stateWithItem = {
            items: [{ pizzaId: '1', unitPrice: 10, quantity: 1 }]
        };
        const action = {
            type: 'REMOVE_ITEM' as const,
            payload: '1'
        };
        const newState = orderReducer(stateWithItem, action);
        expect(newState.items).toHaveLength(0);
    });

    it('should clear the order', () => {
        const stateWithItem = {
            items: [{ pizzaId: '1', unitPrice: 10, quantity: 1 }]
        };
        const action = { type: 'CLEAR_ORDER' as const };
        const newState = orderReducer(stateWithItem, action);
        expect(newState.items).toHaveLength(0);
    });
});
