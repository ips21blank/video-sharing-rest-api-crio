import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';
import { EnvSchema } from './types';

const envPath = path.join(__dirname, '../.env');

dotenv.config({ path: envPath });

const envSchema = Joi.object<EnvSchema>()
  .keys({
    EXP_PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('mongodb url'),
    JWT_SEC_KEY: Joi.string().required().description('jwt sec key'),
    JWT_EXP_MIN: Joi.number().default(9).description('jwt exp min')
  })
  .options({ allowUnknown: true });

const { value, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Invalid env configurations :-\n${error.message}`);
}

const configs = {
  port: value.EXP_PORT,
  mongoose: {
    url: value.MONGODB_URL,
    options: {
      // NOTE!! : FOLLOWING ARE NO LONGER REQUIRED/SUPPPORTED BY NEW MONGOOSE 6.0.
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    }
  },
  jwt: {
    secKey: value.JWT_SEC_KEY,
    expMin: value.JWT_EXP_MIN
  }
};

export { configs };
