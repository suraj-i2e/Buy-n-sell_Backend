import Hapi from '@hapi/hapi';
import routes from './routes/index.js';
import { db } from './database.js';

let server;
const start= async()=>{
    server = Hapi.server({
        port:8000,
        host:'localhost',
    });

    server.route({
        method:'GET',
        path:'/hello',
        handler:(req,h)=>{
             return 'Hello!';
            // return h.response('Hello!').code(201);
        }
    });

    routes.forEach(route=>server.route(route))

    db.connect();

    await server.start();
    console.log(`Server is listening at ${server.info.uri}`);
}

process.on('unhandledRejection',err=>{
    console.log(err);
    process.exit(1);
});

process.on('SIGINT',async()=>{
    console.log('Stopping Server...');
    await server.stop({timeout:10000});
    db.end();
    console.log('Server Stopped');
    process.exit(0);
})

start();