interface EnvSchema {
  EXP_PORT: number;
  MONGODB_URL: string;
  JWT_SEC_KEY: string;
  JWT_EXP_MIN: number;
}

export type { EnvSchema };
