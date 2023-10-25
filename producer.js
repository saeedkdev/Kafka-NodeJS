const Kafka = require('node-rdkafka');
const { configFromPath } = require('./util');

const readline = require('readline');

function createProducer(config, onDeliveryReport) {
    const producer = new Kafka.Producer(config);

    return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
    });
}

async function produceExample() {

    if (process.argv.length < 3) {
        console.log("Please provide the configuration file path as the command line argument");
        process.exit(1);
    }
    let configPath = process.argv.slice(2)[0];
    const config = await configFromPath(configPath);
    config['dr_msg_cb'] = true;

    let topic = "items";

    const producer = await createProducer(config, (err, report) => {
        if (err) {
            console.warn('Error producing', err)
        } else {
            const {topic, key, value} = report;
            let k = key.toString().padEnd(10, ' ');
            console.log(`Produced event to topic ${topic}: key = ${k} value = ${value}`);
        }
    });

    // ask console for itemId and quantity
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let itemId, quantity;

    rl.question('Enter itemId: ', (itemId) => {
        rl.question('Enter quantity: ', (quantity) => {

            let customerId = 1;

            producer.produce(topic, -1, Buffer.from(JSON.stringify({itemId, quantity})), customerId);


            producer.flush(10000, () => {
                producer.disconnect();
            });

            console.log(`itemId: ${itemId}, quantity: ${quantity}`);
            rl.close(); 
        });

    });

}

produceExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });
