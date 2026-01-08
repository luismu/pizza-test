import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Trash2, CheckCircle, ChevronUp, ChevronDown, X, Plus, Minus } from 'lucide-react';
import { useOrder } from '../../state/OrderContext';
import { usePizzas } from '../../state/PizzaContext';
import { calculateLineDiscount } from '../../utils/discount';
import SuccessModal from '../common/SuccessModal';
import styles from './OrderSummary.module.css';

const OrderSummary = () => {
    const { items, totals, removeItem, clearOrder, updateQuantity } = useOrder();
    const { state: pizzaState } = usePizzas();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastOrderId, setLastOrderId] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const prevTotalRef = useRef(totals.total);

    useEffect(() => {
        if (totals.total > prevTotalRef.current && !isExpanded) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
        prevTotalRef.current = totals.total;
    }, [totals.total, isExpanded]);

    const handleConfirmOrder = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (items.length === 0) return;

        const newId = Math.random().toString(36).substr(2, 9).toUpperCase();
        const order = {
            id: newId,
            items,
            ...totals,
            timestamp: new Date().toISOString(),
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...orders, order]));

        setLastOrderId(newId);
        setIsModalOpen(true);
        setIsExpanded(false);
        clearOrder();
    };

    if (items.length === 0 && !isModalOpen) return null;

    return (
        <>
            <div
                className={`${styles.summaryWrapper} ${isExpanded ? styles.expanded : ''} ${isAnimating ? styles.pulse : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {}
                <div className={styles.collapsedBar}>
                    <div className={styles.summaryInfo}>
                        <div className={styles.cartIconWrapper}>
                            <ShoppingBag size={20} />
                            <span className={styles.badge}>{items.length}</span>
                        </div>
                        <div className={styles.totalInfo}>
                            <span className={styles.totalLabel}>Your Order</span>
                            <span className={styles.totalAmount}>${totals.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {isExpanded ? (
                        <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}>
                            <X size={24} />
                        </button>
                    ) : (
                        <div className={styles.expandAction}>
                            <span>Pay</span>
                            <ChevronUp size={20} />
                        </div>
                    )}
                </div>

                {}
                <div className={styles.expandedContent} onClick={(e) => e.stopPropagation()}>


                    <div className={styles.itemsList}>
                        {items.map((item) => {
                            const pizza = pizzaState.pizzas.find((p) => p.id === item.pizzaId);
                            const lineDiscount = calculateLineDiscount(item.unitPrice, item.quantity);
                            const lineTotal = item.unitPrice * item.quantity - lineDiscount;

                            return (
                                <div key={item.pizzaId} className={styles.itemRow}>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemName}>{pizza?.name || 'Unknown'}</span>
                                        <div className={styles.itemPricingCompact}>
                                            <span className={styles.finalPrice}>${lineTotal.toFixed(2)}</span>
                                            {lineDiscount > 0 && (
                                                <span className={styles.discountBadge}>-10%</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.qtyControls}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    updateQuantity(item.pizzaId, item.quantity - 1);
                                                } else {
                                                    removeItem(item.pizzaId);
                                                }
                                            }}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className={styles.itemQty}>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.pizzaId, item.quantity + 1)}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.totalsSection}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        {totals.totalDiscount > 0 && (
                            <div className={`${styles.totalRow} ${styles.discountRow}`}>
                                <span>Bulk Discount</span>
                                <span>-${totals.totalDiscount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                            <span>Total</span>
                            <span>${totals.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.actionsFooter}>
                        <button onClick={() => setShowClearConfirm(true)} className={styles.clearOrderBtn}>
                            <Trash2 size={20} />
                        </button>
                        <button onClick={handleConfirmOrder} className={styles.confirmBtn}>
                            <CheckCircle size={20} />
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>

            {isExpanded && <div className={styles.overlay} onClick={() => setIsExpanded(false)} />}

            {}
            {showClearConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.confirmModal}>
                        <h3>Clear Order?</h3>
                        <p>Are you sure you want to remove all items from your order?</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => setShowClearConfirm(false)} className={styles.cancelBtn}>
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    clearOrder();
                                    setShowClearConfirm(false);
                                    setIsExpanded(false);
                                }}
                                className={styles.confirmClearBtn}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                orderId={lastOrderId}
            />
        </>
    );
};

export default OrderSummary;
