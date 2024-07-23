import {Hono} from "hono";
import { deleteBlogPost, getBlogHandler, getBulkBlogHandler, postBlogHandler, putBlogHandler, togglePublishesHandler } from "../handlers/blog.handlers";

export const blogRoutes = new Hono().basePath('/blog')


blogRoutes.post('', ...postBlogHandler);
blogRoutes.put('/:id', ...putBlogHandler);
blogRoutes.put('/toggle/:id',...togglePublishesHandler);
blogRoutes.get('/bulk', ...getBulkBlogHandler);
blogRoutes.get('/:id', ...getBlogHandler);
blogRoutes.delete('delete/:id',...deleteBlogPost);

//make sure that :id route is lower in the chain 
//because they have the same request type and the /bulk satisfies the /:id type so the /:id will be hit