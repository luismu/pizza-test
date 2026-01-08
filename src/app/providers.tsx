import type { ReactNode } from 'react';
import { PizzaProvider } from '../state/PizzaContext';
import { OrderProvider } from '../state/OrderContext';
import { SearchProvider } from '../state/SearchContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <PizzaProvider>
            <SearchProvider>
                <OrderProvider>
                    {children}
                </OrderProvider>
            </SearchProvider>
        </PizzaProvider>
    );
};
