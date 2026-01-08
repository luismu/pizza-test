import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PizzaDetails from '../pages/PizzaDetails';
import AddPizza from '../pages/AddPizza';
import MainLayout from '../components/layout/MainLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/pizza/:id',
                element: <PizzaDetails />,
            },
            {
                path: '/add-pizza',
                element: <AddPizza />,
            },
        ],
    },
]);
