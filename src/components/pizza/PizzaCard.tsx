import { Link } from 'react-router-dom';
import { Plus, Pizza as PizzaIcon } from 'lucide-react';
import type { Pizza } from '../../types';
import { useOrder } from '../../state/OrderContext';
import styles from './PizzaCard.module.css';

interface PizzaCardProps {
    pizza: Pizza;
}

const PizzaCard = ({ pizza }: PizzaCardProps) => {
    const { addItem } = useOrder();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(pizza.id, pizza.price, 1);
    };

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.name}>{pizza.name}</h3>

                <p className={styles.description}>
                    {pizza.ingredients.join(', ')}
                </p>

                <div className={styles.footer}>
                    <span className={styles.price}>${pizza.price.toFixed(2)}</span>
                    <button onClick={handleAddToCart} className={styles.addBtn} title="Agregar">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <Link to={`/pizza/${pizza.id}`} className={styles.imageLink} title="View Details">
                <div className={styles.imagePlaceholder}>
                    <PizzaIcon size={40} className={styles.pizzaIcon} />
                    {pizza.category && <span className={styles.categoryBadge}>{pizza.category}</span>}
                </div>
            </Link>
        </div>
    );
};

export default PizzaCard;
