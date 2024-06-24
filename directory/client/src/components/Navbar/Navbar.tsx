import { ConnectBtn, useUser } from '@quyx/ui-react';
import { IconMenu2, IconUser } from '@tabler/icons-react';
import { Address } from 'ton-core';
import { AnchorLink } from '..';

type Props = {
    open: () => void;
};

const Navbar = ({ open }: Props) => {
    const user = useUser();

    return (
        <nav className="d-flex align-items-center justify-content-between p-3">
            <div>
                <button onClick={open} className="d-flex d-md-none toggler">
                    <IconMenu2 />
                </button>
            </div>

            <div className="d-flex align-items-center" style={{ gap: '1.2rem' }}>
                <ConnectBtn />

                {user ? (
                    <AnchorLink to={`/user/${Address.parse(user.address)}`}>
                        <IconUser size={26} strokeWidth={1.8} />
                    </AnchorLink>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
