import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Pizza } from '../types';
import initialPizzas from '../data/pizzas.json';

interface PizzaState {
    pizzas: Pizza[];
    loading: boolean;
}

type PizzaAction =
    | { type: 'SET_PIZZAS'; payload: Pizza[] }
    | { type: 'ADD_PIZZA'; payload: Pizza };

const PizzaContext = createContext<{
    state: PizzaState;
    addPizza: (pizza: Pizza) => void;
} | undefined>(undefined);

function pizzaReducer(state: PizzaState, action: PizzaAction): PizzaState {
    switch (action.type) {
        case 'SET_PIZZAS':
            return { ...state, pizzas: action.payload, loading: false };
        case 'ADD_PIZZA':
            return { ...state, pizzas: [...state.pizzas, action.payload] };
        default:
            return state;
    }
}

export const PizzaProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(pizzaReducer, {
        pizzas: [],
        loading: true,
    });

    useEffect(() => {
        
        const savedPizzas = localStorage.getItem('pizzas');
        if (savedPizzas) {
            dispatch({ type: 'SET_PIZZAS', payload: JSON.parse(savedPizzas) });
        } else {
            dispatch({ type: 'SET_PIZZAS', payload: initialPizzas });
        }
    }, []);

    const addPizza = (pizza: Pizza) => {
        dispatch({ type: 'ADD_PIZZA', payload: pizza });
        
        const currentPizzas = [...state.pizzas, pizza];
        localStorage.setItem('pizzas', JSON.stringify(currentPizzas));
    };

    return (
        <PizzaContext.Provider value={{ state, addPizza }}>
            {children}
        </PizzaContext.Provider>
    );
};

export const usePizzas = () => {
    const context = useContext(PizzaContext);
    if (!context) throw new Error('usePizzas must be used within a PizzaProvider');
    return context;
};
