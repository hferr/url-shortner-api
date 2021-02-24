import { app } from './app';

// for heroku we should use process.env.PORT
const port = process.env.PORT || 8081;

var server = app.listen(port, () => console.log(`application listening on port ${port}`));

process.on('SIGINT', () => {
    server.close();
    console.log('application was shutdown');
});