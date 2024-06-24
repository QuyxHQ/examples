import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, NotFound, User } from './screens';
import { Layout } from './components';
import './App.css';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout children={<Home />} />,
            errorElement: <NotFound />,
        },
        {
            path: '/user/:address',
            element: <Layout children={<User />} />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
