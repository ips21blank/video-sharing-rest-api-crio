import { VideoSaveData } from './schema.types';

interface EnvSchema {
  EXP_PORT: number;
  MONGODB_URL: string;
  JWT_SEC_KEY: string;
  JWT_EXP_MIN: number;
}

interface NewVideoRequest extends VideoSaveData {}

export type { EnvSchema, NewVideoRequest };
