import "express-async-errors";
import express, { Application, json } from 'express';
import { handleErrors } from './errors';
import { courseRouter, sessionRouter, userRouter } from './routers';

const app: Application = express();
app.use(json());

app.use( "/login", sessionRouter );
app.use( "/users", userRouter );
app.use( "/courses", courseRouter );

app.use(handleErrors);

export default app;
