import { kafka } from './client';

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'file-upload', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message?.value?.toString() || '{}');
      console.log('--- New File Upload Event ---');
      console.log(`Topic: ${topic}`);
      console.log(`Partition: ${partition}`);
      console.log(`Offset: ${message.offset}`);
      console.log('Payload:', payload);
      console.log('-----------------------------');
    },
  });
};

run().catch(console.error);
