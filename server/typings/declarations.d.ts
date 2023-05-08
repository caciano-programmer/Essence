import 'express';

declare module 'express-session' {
  interface SessionData {
    user: { name: string; email: string };
  }
}
