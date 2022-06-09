import { configs } from './config';
import mongoose from 'mongoose';
import { app } from './app';

// console.log(configs);
(async () => {
  await mongoose.connect(configs.mongoose.url, configs.mongoose.options);
  app.listen(configs.port, () => `server listening on ${configs.port}...`);
})();
