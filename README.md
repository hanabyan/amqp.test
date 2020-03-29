# amqp.test
This repo is intended to simply test the rabbitmq service

Available server environent
- local/alpha (default)
- beta
- production

## How to make it works
Clone this repo and go to root directory, then run
```
npm install
```

Make sure to copy needed server environment, for example .env.example to .env
Then run
```
node src/as_consumer.js
```

or as producer ...

```
node src/as_producer.js
```

### Working with different environment

#### Example to work with beta environment
Copy .env.beta.example into .env.beta
Then run
```
ENV=beta node src/as_consumer.js
```

or as producer ...

```
ENV=beta node src/as_producer.js
```