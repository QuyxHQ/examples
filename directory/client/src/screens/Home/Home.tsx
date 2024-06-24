import { IconFile } from '@tabler/icons-react';

const Home = () => {
    return (
        <div className="home">
            <div className="bg" />

            <h1>Hi there!</h1>
            <p className="mb-3">This is just an example of quyx in action</p>

            <a href="https://docs.quyx.xyz" target="_blank">
                <button className="btn p-4">
                    <IconFile size={20} strokeWidth={1.5} />
                    <div>Go to Documentation</div>
                </button>
            </a>
        </div>
    );
};

export default Home;
