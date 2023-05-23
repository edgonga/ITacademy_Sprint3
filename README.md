# ITacademy_Sprint3
Barcelona Activa 3rd sprint of the bootcamp BA Node.js

Take note that the "Publisher-Subscriber" project needs RabbitMQ to be executed

(Not totally implemented) That's why I prepare this project to be launch with Docker without downloading and installing RabbitMQ

To run the container:

```js
docker run -d --name mi-contenedor-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq_publisher-subscriber
```

For more details, the image container base is built in nodejs and rabbitMQ is build above it and check the Dockerfile for the init commands
