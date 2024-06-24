import { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        window.location.href = '/';
    }, []);

    return null;
};

export default NotFound;
