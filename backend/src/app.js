import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import config from './config/config.js';
app.use(
    cors({
        origin:[
            'http://localhost:5173',
            // config.get("CORS_ORIGIN"),
            "https://mytodo-nine-omega.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders:['Content-Type', 'Authorization'],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


export { app };