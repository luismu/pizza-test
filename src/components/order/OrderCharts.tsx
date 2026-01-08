import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { usePizzas } from '../../state/PizzaContext';
import { useOrder } from '../../state/OrderContext';
import styles from './OrderCharts.module.css';

const COLORS = ['#e63946', '#457b9d', '#1d3557', '#a8dadc', '#f1faee'];

const OrderCharts = () => {
    const { state: pizzaState } = usePizzas();
    const { items } = useOrder();

    const priceData = pizzaState.pizzas.map((p) => ({
        name: p.name,
        price: p.price,
    }));

    const orderData = items.map((item) => {
        const pizza = pizzaState.pizzas.find((p) => p.id === item.pizzaId);
        return {
            name: pizza?.name || 'Unknown',
            value: item.quantity,
        };
    });

    const revenueData = items.map((item) => {
        const pizza = pizzaState.pizzas.find((p) => p.id === item.pizzaId);
        return {
            name: pizza?.name || 'Unknown',
            revenue: (pizza?.price || 0) * item.quantity,
        };
    });

    return (
        <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
                <h3>Menu Price Distribution ($)</h3>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" fontSize={12} tickCount={5} />
                            <YAxis fontSize={12} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="price" fill="#457b9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={styles.chartCard}>
                <h3>Current Order Distribution (Qty)</h3>
                <div className={styles.chartWrapper}>
                    {items.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className={styles.noData}>
                            <p>Add items to see order distribution</p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.chartCard}>
                <h3>Revenue by Pizza Type ($)</h3>
                <div className={styles.chartWrapper}>
                    {items.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    formatter={(value: number | undefined) => `$${(value || 0).toFixed(2)}`}
                                />
                                <Bar dataKey="revenue" fill="#e63946" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className={styles.noData}>
                            <p>Add items to see revenue breakdown</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderCharts;
