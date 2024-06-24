import { useState } from 'react';
import { Navbar, Sidebar } from '..';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarState, setSidebarState] = useState<'opened' | 'closed'>('closed');
    const open = () => setSidebarState('opened');
    const close = () => setSidebarState('closed');

    return (
        <main className="app">
            <Sidebar open={open} close={close} state={sidebarState} />

            <section className="body">
                <Navbar open={open} />

                <div className="px-3 py-1">{children}</div>
            </section>
        </main>
    );
};

export default Layout;
