import {Hono} from 'hono';
import {signupHanlder, signinHandler, logoutHandler, deleteUserAccount, meHandler} from '../handlers/user.handlers'

export const userRoutes = new Hono().basePath('/user');


userRoutes.post('/signin', ...signinHandler);
userRoutes.post('/signup', ...signupHanlder);
userRoutes.post('/logout', ...logoutHandler);
userRoutes.delete('/delete',...deleteUserAccount);
userRoutes.get('/me',...meHandler);