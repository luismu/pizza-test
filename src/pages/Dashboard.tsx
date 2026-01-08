import { useState, useMemo } from 'react';
import { usePizzas } from '../state/PizzaContext';
import PizzaCard from '../components/pizza/PizzaCard';
import PizzaFilters from '../components/pizza/PizzaFilters';
import OrderSummary from '../components/order/OrderSummary';
import OrderCharts from '../components/order/OrderCharts';
import { useSearch } from '../state/SearchContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { state } = usePizzas();
    const { search, setSearch } = useSearch(); 
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('name-asc');

    

    const categories = useMemo(() => {
        const cats = state.pizzas.map((p) => p.category).filter(Boolean) as string[];
        return Array.from(new Set(cats));
    }, [state.pizzas]);

    const filteredAndSortedPizzas = useMemo(() => {
        let result = [...state.pizzas];

        
        if (search) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()))
            );
        }

        if (category) {
            result = result.filter((p) => p.category === category);
        }

        
        result.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return result;
    }, [state.pizzas, search, category, sortBy]);

    if (state.loading) {
        return <div className={styles.loading}>Loading Menu...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.mainCol}>
                <PizzaFilters
                    category={category}
                    setCategory={setCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    categories={categories}
                />

                {filteredAndSortedPizzas.length > 0 ? (
                    <div className={styles.pizzaGrid}>
                        {filteredAndSortedPizzas.map((pizza) => (
                            <PizzaCard key={pizza.id} pizza={pizza} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        <h3>No pizzas found matching your criteria.</h3>
                    </div>
                )}

                <section className={styles.chartsSection}>
                    <h2 className={styles.sectionTitle}>Analytics Breakdown</h2>
                    <OrderCharts />
                </section>
            </div>

            <OrderSummary />
        </div>
    );
};

export default Dashboard;
