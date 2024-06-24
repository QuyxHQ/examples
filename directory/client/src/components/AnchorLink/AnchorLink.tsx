import { Link } from 'react-router-dom';

type Props = {
    to: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    handleClick?: () => void;
    title?: string;
    target?: string;
};

const AnchorLink = (props: Props) => {
    function click() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof props.handleClick != 'undefined') return props.handleClick();
    }

    return (
        <Link
            to={props.to}
            className={props.className}
            style={props.style}
            onClick={click}
            title={props.title}
            target={props.target}
        >
            {props.children}
        </Link>
    );
};

export default AnchorLink;
