import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import styles from './MainLayout.module.css';

const MainLayout = () => {
    return (
        <div className={styles.appContainer}>
            <Header />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <p>© 2026 Pizza Pro - Luis Senior Challenge of YesLawyer ⚖️</p>
            </footer>
        </div>
    );
};

export default MainLayout;
