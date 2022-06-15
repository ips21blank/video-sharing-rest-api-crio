import mongoose from 'mongoose';

import { configs } from './config';
import { app } from './app';

// console.log(configs);
(async () => {
  await mongoose.connect(configs.mongoose.url, configs.mongoose.options);
  app.listen(configs.port, () => console.log(`server listening on ${configs.port}...`));
})();
