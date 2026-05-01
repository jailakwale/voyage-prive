const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set in .env or CI secrets.`);
  }

  return value;
};

const sharedPassword = requiredEnv("SAUCE_PASSWORD");

export const loginUsers = {
  valid: {
    username: requiredEnv("STANDARD_USER"),
    password: sharedPassword,
  },
  invalid: {
    username: requiredEnv("INVALID_USER"),
    password: sharedPassword,
  },
} as const;
