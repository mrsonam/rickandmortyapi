import { Button, Card, Col, Image, Row, Tooltip } from 'antd';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Character, Info } from '../types/types';
import { ManOutlined, SyncOutlined, WomanOutlined } from '@ant-design/icons';

const Home: NextPage<{ info: Info; characters: Character[] }> = ({
    info,
    characters,
}) => {
    console.log(info);
    return (
        <div>
            <Head>
                <title>Rick and Morty Api</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    The Rick and Morty API{' '}
                    <Tooltip title="Reload Page">
                        <SyncOutlined
                            onClick={() => window.location.reload()}
                        />
                    </Tooltip>
                </h1>

                <Row className={styles.main} gutter={[24, 24]}>
                    {characters.map((character) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={character.id}>
                            <Card
                                cover={
                                    <Image
                                        src={character.image}
                                        alt={character.name}
                                    />
                                }
                                className={styles.card}
                            >
                                <h2>
                                    {character.name}{' '}
                                    {character.gender === 'Male' ? (
                                        <ManOutlined
                                            style={{ color: '#8ecefd' }}
                                        />
                                    ) : (
                                        <WomanOutlined
                                            style={{ color: '#f88b9d' }}
                                        />
                                    )}
                                </h2>
                                <h4>
                                    {character.status} - {character.species}
                                </h4>

                                <p>Location: {character.location.name}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${Math.floor(
            Math.random() * (42 - 1) + 1,
        )}`,
    );
    const { info, results } = await res.json();

    return {
        props: {
            info: info,
            characters: results,
        },
    };
};

export default Home;
