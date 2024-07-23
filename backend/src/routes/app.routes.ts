import {Hono} from 'hono';
import { userRoutes } from './user.routes';
import { blogRoutes } from './blog.routes';


export const appRoutes = new Hono().basePath("/api/v1");

appRoutes.route('/',userRoutes);
appRoutes.route('/',blogRoutes);
