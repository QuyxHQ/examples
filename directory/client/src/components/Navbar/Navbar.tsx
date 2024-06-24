import { ConnectBtn, useCredential, useUser } from '@quyx/ui-react';
import { IconHome, IconMenu2, IconUser } from '@tabler/icons-react';
import { Address } from 'ton-core';
import { AnchorLink } from '..';

type Props = {
    open: () => void;
};

const Navbar = ({ open }: Props) => {
    const user = useUser();
    const credential = useCredential();

    return (
        <nav className="d-flex align-items-center justify-content-between p-3">
            <div>
                <button onClick={open} className="d-flex d-md-none toggler">
                    <IconMenu2 />
                </button>
            </div>

            <div className="d-flex align-items-center" style={{ gap: '1.2rem' }}>
                <ConnectBtn />

                {user && credential ? (
                    <AnchorLink to={`/user/${Address.parse(user.address)}`}>
                        <IconUser size={26} strokeWidth={1.5} />
                    </AnchorLink>
                ) : null}

                <AnchorLink to="/">
                    <IconHome size={26} strokeWidth={1.5} />
                </AnchorLink>
            </div>
        </nav>
    );
};

export default Navbar;
