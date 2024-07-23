import { createFactory } from 'hono/factory'
import {appRoutes} from './routes/app.routes'
import { PrismaClient } from '@prisma/client/extension'
import { injectPrisma } from './middlewares/prisma'
import { cors } from 'hono/cors'
import {Hono} from 'hono';

export interface ENV{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
    COOKIE_SECRET:string
  },
  Variables: {
    prisma:PrismaClient,
    id:string,
  }
}

export const factory = createFactory<ENV>()

const app = factory.createApp();

app.use('*',cors());
app.use('*',injectPrisma);
app.route('/',appRoutes);

app.get('/',(c)=>{
  return c.text('hello hono!')
})

export default app

