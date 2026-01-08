import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

const SuccessModal = ({ isOpen, onClose, orderId }: SuccessModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>

                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle size={60} className={styles.icon} />
                    </div>

                    <h2 className={styles.title}>Order Confirmed!</h2>
                    <p className={styles.message}>
                        Your delicious pizza is being prepared as we speak.
                    </p>

                    <div className={styles.orderNumber}>
                        Order ID: <span>#{orderId}</span>
                    </div>

                    <button className={styles.actionBtn} onClick={onClose}>
                        Great, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
