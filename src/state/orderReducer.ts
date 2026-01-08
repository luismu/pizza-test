import type { OrderItem } from '../types';

export type OrderAction =
    | { type: 'ADD_ITEM'; payload: { pizzaId: string; price: number; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { pizzaId: string; quantity: number } }
    | { type: 'CLEAR_ORDER' };

export interface OrderState {
    items: OrderItem[];
}

export const initialOrderState: OrderState = {
    items: [],
};

export function orderReducer(state: OrderState, action: OrderAction): OrderState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.pizzaId === action.payload.pizzaId
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
                };
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        pizzaId: action.payload.pizzaId,
                        quantity: action.payload.quantity,
                        unitPrice: action.payload.price,
                    },
                ],
            };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.pizzaId !== action.payload),
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.pizzaId === action.payload.pizzaId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case 'CLEAR_ORDER':
            return initialOrderState;

        default:
            return state;
    }
}
