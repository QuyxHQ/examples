import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../shared/api';
import { IconBrandTelegram } from '@tabler/icons-react';
import { Loader } from '../../components';

const User = () => {
    const { address } = useParams() as { address: string };
    const navigate = useNavigate();

    const { isPending, data } = useQuery({
        queryKey: [address],
        queryFn: async function () {
            const client = new Api();
            const user = await client.getUser(address);
            if (!user) navigate('/', { replace: true });

            return user?.payload.vc.credentialSubject;
        },
    });

    return (
        <div className="user">
            <div className="bg" />

            {isPending ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ gap: '1.8rem', height: '30rem' }}
                >
                    <Loader size={30} />
                    <p style={{ color: '#888', fontWeight: 500 }}>Loading...</p>
                </div>
            ) : (
                <div className="user-info d-flex flex-column align-items-lg-center flex-lg-row py-3 py-lg-5 mb-5">
                    <img src={data.profile_picture} alt={data.name} height={500} width={500} />

                    <div>
                        <div>
                            <p>Name</p>
                            <h2>{data.name}</h2>
                        </div>

                        <div className="mb-2">
                            <p>Bio</p>
                            <h2>{data.bio}</h2>
                        </div>

                        <a href={data.link_to_telegram_profile} target="_blank">
                            <button className="btn">
                                <IconBrandTelegram size={20} strokeWidth={1.5} />
                                <div>Message on TG</div>
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
