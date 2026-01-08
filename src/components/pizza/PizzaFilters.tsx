import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './PizzaFilters.module.css';

interface PizzaFiltersProps {
    category: string;
    setCategory: (c: string) => void;
    sortBy: string;
    setSortBy: (s: string) => void;
    categories: string[];
}

const PizzaFilters: React.FC<PizzaFiltersProps> = ({
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryClick = (c: string) => {
        setCategory(c);
        setIsOpen(false);
    };

    return (
        <div className={`${styles.filterBar} ${isOpen ? styles.open : ''}`}>

            {}
            <div
                className={styles.mobileHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.mobileTitle}>
                    <Filter size={18} />
                    <span>Filters</span>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            <div className={styles.filterContent}>
                <div className={styles.categoryCarousel}>
                    <button
                        className={`${styles.categoryChip} ${category === '' ? styles.activeChip : ''}`}
                        onClick={() => handleCategoryClick('')}
                    >
                        All
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c}
                            className={`${styles.categoryChip} ${category === c ? styles.activeChip : ''}`}
                            onClick={() => handleCategoryClick(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className={styles.controls}>
                    <div className={styles.selectWrapper}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.select}
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="price-asc">Price (Low-High)</option>
                            <option value="price-desc">Price (High-Low)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaFilters;
