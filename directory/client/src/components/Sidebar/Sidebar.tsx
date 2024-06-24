import { IconSearch } from '@tabler/icons-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnchorLink, Loader } from '..';
import Api from '../../shared/api';
import { useEffect, useState } from 'react';
import { extractUsername } from '../../shared/helper';
import { Address } from 'ton-core';
import { useInView } from 'react-intersection-observer';

type Props = {
    open: () => void;
    close: () => void;
    state: 'opened' | 'closed';
};

const Sidebar = ({ state, close }: Props) => {
    const [total, setTotal] = useState<number>();
    const [users, setUsers] = useState<Record<string, any[]>>();
    const { ref: _ref, inView } = useInView();

    const sectors = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    const { data, isFetchingNextPage, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: async function ({ pageParam }) {
            const client = new Api();
            const { data, total } = await client.getUsers(pageParam, 150);

            setTotal(total);
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: function (lastPage, allPages) {
            return lastPage.length ? allPages.length + 1 : undefined;
        },
    });

    useEffect(() => {
        if (!data) return;
        const flattened_data = data.pages.flat();

        if (flattened_data.length == 0) return undefined;

        const sortedData: Record<string, any[]> = {};

        flattened_data.forEach((item) => {
            const vc = item.payload.vc.credentialSubject;
            const firstLetter = vc.name.charAt(0).toUpperCase();
            if (!sortedData[firstLetter]) sortedData[firstLetter] = [];
            sortedData[firstLetter].push(vc);
        });

        console.log(sortedData);
        setUsers(sortedData);
    }, [data]);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            <div
                className={`overlay ${state == 'opened' ? 'd-block' : 'd-none'} d-md-none`}
                onClick={close}
            />

            <div className={`sidebar ${state == 'opened' ? 'd-block' : 'd-none'} d-md-block`}>
                <div className="top">
                    <div>
                        <h2>Directory</h2>
                        <p>Search directory of {total ?? <Loader size={13} />} users</p>
                    </div>

                    <form action="#">
                        <IconSearch size={22} />
                        <input type="search" placeholder="Search" />
                    </form>
                </div>

                <div className="main">
                    {users
                        ? sectors.map((sector) =>
                              users[sector] ? (
                                  <div className="item" key={`item-${sector}`}>
                                      <div className="title">{sector}</div>

                                      {users[sector].map((user, index) => (
                                          <div className="user" key={`user-${index}`}>
                                              <AnchorLink
                                                  to={`/user/${Address.parse(user.address)}`}
                                              >
                                                  <img src={user.profile_picture} alt={user.name} />

                                                  <div>
                                                      <h4>{user.name}</h4>
                                                      <p>
                                                          @
                                                          {extractUsername(
                                                              user.link_to_telegram_profile
                                                          )}
                                                      </p>
                                                  </div>
                                              </AnchorLink>
                                          </div>
                                      ))}
                                  </div>
                              ) : null
                          )
                        : null}

                    {status === 'pending' || isFetchingNextPage ? (
                        <div className="item">
                            <div className="title">....</div>
                            <div className="d-flex align-items-center justify-content-center pt-4 mt-2">
                                <Loader />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
