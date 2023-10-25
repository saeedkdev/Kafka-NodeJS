## NodeJS Kafka Example
This repository helps you understand how Kafka works with its producer and consumer. The producer collects information from the user and sends it to a topic, while the consumer displays this information. This system is designed to mimic an order in an e-commerce project. Imagine you want to buy something online. You select the item and the quantity, and this data is sent to a microservice that keeps track of available items in the database.

#### How to test this ?
1. edit kafka.properties.example file and remove the .example from the name
2. Replace the placeholders with your confluent (kafka) information
3. Run the following command to install necessary packages
    ```sh
    npm install
    ```
4. Start the consumer by running the following command
    ```sh
    npm run consumer
    ```
5. Start the producer by running the following command
    ```sh
    npm run producer
    ```
6. Answer the questions the terminal asks and you should be able to see the information you provided in the consumer

    ![Output Example](https://imgtr.ee/images/2023/10/25/a8a6157923b24e63335ee4170b622f8f.png)
