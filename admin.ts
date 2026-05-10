import { kafka } from './client';

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  console.log('Admin connected');

  console.log('Creating topic: file-upload');
  await admin.createTopics({
    topics: [
      {
        topic: 'file-upload',
        numPartitions: 1,
      },
    ],
  });
  console.log('Topic created successfully');

  await admin.disconnect();
  console.log('Admin disconnected');
};

run().catch(console.error);
