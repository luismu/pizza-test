import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pizza, Plus, LayoutDashboard, Search } from 'lucide-react';
import { useSearch } from '../../state/SearchContext';
import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const { search, setSearch } = useSearch();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <Pizza className={styles.logoIcon} />
                    <span>Pizza<span className={styles.logoAccent}>Pro</span></span>
                </Link>

                <nav className={styles.nav}>
                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Find your favorite pizza..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Link
                        to="/"
                        className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className={styles.navText}>Dashboard</span>
                    </Link>
                    <Link
                        to="/add-pizza"
                        className={`${styles.navLink} ${location.pathname === '/add-pizza' ? styles.active : ''}`}
                    >
                        <Plus size={20} />
                        <span className={styles.navText}>Add Pizza</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
