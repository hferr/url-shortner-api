import { getConnectionOptions, createConnection, ConnectionOptions } from 'typeorm';

const getOptions = async () => {
    var connectionOptions: ConnectionOptions
    connectionOptions = {
        type: 'postgres',
        synchronize: false,
        logging: false,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            },
        },
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts']
    };
    if (process.env.DATABASE_URL) { // for heroku
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        connectionOptions = await getConnectionOptions();
    }

    return connectionOptions;
};

export const connectToDb = async () => {
    const typeormconfig = await getOptions();
    const connection = await createConnection(typeormconfig);
    console.log(`Connection to database succeded`);
    process.on('SIGINT', () => {
        connection.close().then(() => console.log('Connection to database closed'));
    });
};