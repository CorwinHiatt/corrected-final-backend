import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors'; 
import { getAllPosts, addPost, getOnePost, updatePost, deletePost } from './src/posts.js';

const app = express();
app.use(cors());
app.use(express.json());

//Routes....
app.get('/posts', getAllPosts)
app.get('/posts/:uid', getOnePost)
app.post('/posts', addPost)
app.patch('/posts/:uid', updatePost)
app.delete('/posts/:uid', deletePost)

export const api = functions.https.onRequest(app)
