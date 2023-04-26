import 'express';

declare module 'express-session' {
  interface Session {
    USER: { name: string; email: string };
  }
}
