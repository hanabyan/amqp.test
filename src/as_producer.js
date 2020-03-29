const dotenv = require('dotenv');

const ENV = process.env.ENV;
const config = {};

/**
 * expectiong beta, production
 * make sure .env.beta or .env.production exists
 */
if (ENV) {
    Object.assign(config, {
        path: `./.env.${ENV}`,
    });
}

dotenv.config(config);

var q = process.env.AMQP_QUEUE;
var user = process.env.AMQP_USER;
var pass = process.env.AMQP_PASS;
var host = process.env.AMQP_HOST;
var vhost = process.env.AMQP_VHOST;
var isSecure =
    process.env.AMQP_IS_SECURE !== undefined
        ? process.env.AMQP_IS_SECURE === 'false'
            ? false
            : true
        : true;
var protocol = 'amqps';
if (!isSecure) {
    protocol = 'amqp';
}

console.log(
    `Trying to connect to ${protocol}://${user}:${pass}@${host}/${vhost}`
);
var open = require('amqplib').connect(
    `${protocol}://${user}:${pass}@${host}/${vhost}`
);

const options = {
    autoDelete: true,
    arguments: {
        'x-expires': 120000,
    },
};

// Publisher
open.then(
    function(conn) {
        return conn.createChannel();
    },
    function(err) {
        console.log(err);
    }
)
    .then(function(ch) {
        return ch.assertQueue(q, options).then(function(ok) {
            //return ch.sendToQueue(q, Buffer.from('something to do'));
            let total = 1000;

            while (total > 0) {
                ch.sendToQueue(
                    q,
                    Buffer.from(`${new Date()} something to do ${total}`)
                );
                total = total - 1;
            }
        });
    })
    .catch(console.warn);
