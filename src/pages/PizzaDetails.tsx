import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, Tag, Leaf } from 'lucide-react';
import { usePizzas } from '../state/PizzaContext';
import { useOrder } from '../state/OrderContext';
import styles from './PizzaDetails.module.css';

const PizzaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state: pizzaState } = usePizzas();
    const { addItem } = useOrder();

    const [quantity, setQuantity] = useState(1);

    const pizza = pizzaState.pizzas.find((p) => p.id === id);

    if (!pizza) {
        return (
            <div className={styles.notFound}>
                <h2>Pizza not found</h2>
                <button onClick={() => navigate('/')} className={styles.backBtn}>
                    Back to Menu
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(pizza.id, pizza.price, quantity);
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
                <ArrowLeft size={18} />
                <span>Back to Menu</span>
            </button>

            <div className={styles.detailCard}>
                <div className={styles.imageSection}>
                    <div className={styles.pizzaGraphic}>
                        <div className={styles.pizzaCircle}>
                            <div className={styles.crust}></div>
                            <div className={styles.toppings}>
                                {pizza.ingredients.map((_, i) => (
                                    <div key={i} className={styles.toppingItem} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.badgeRow}>
                        {pizza.category && <span className={styles.categoryBadge}>{pizza.category}</span>}
                        {pizza.ingredients.some(i => i.toLowerCase().includes('cheese')) && (
                            <span className={styles.veggieBadge}>
                                <Leaf size={12} />
                                Vegetarian
                            </span>
                        )}
                    </div>

                    <h1 className={styles.name}>{pizza.name}</h1>
                    <p className={styles.description}>{pizza.description || "A delicious handmade pizza with the freshest ingredients."}</p>

                    <div className={styles.ingredientsBox}>
                        <h3>Ingredients</h3>
                        <div className={styles.tags}>
                            {pizza.ingredients.map((ing, i) => (
                                <span key={i} className={styles.tag}>
                                    <Tag size={12} />
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.purchaseBox}>
                        <div className={styles.priceCol}>
                            <span className={styles.label}>Price</span>
                            <span className={styles.price}>${pizza.price.toFixed(2)}</span>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.quantitySelector}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qtyBtn}>
                                    <Minus size={18} />
                                </button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className={styles.qtyBtn}>
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button onClick={handleAddToCart} className={styles.addBtn}>
                                <ShoppingCart size={20} />
                                <span>Add to Order - ${(pizza.price * quantity).toFixed(2)}</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.promoNote}>
                        Order 3 or more of this pizza to get an automatic 10% discount!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetails;
