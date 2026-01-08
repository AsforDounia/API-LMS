declare module 'bun' {
  interface Env {
    PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    MONGO_URI?: string;
  }
}
