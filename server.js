// API Documentation
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// packages imports
import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors';
import morgan from 'morgan';

// security packages
import helmet from 'helmet';
// import xss from "xss-clean";
import mongoSanitize from 'express';

// file imports
import conncetDB from './config/db.js';

// routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoute.js'
import userRoutes from './routes/userRoutes.js'



// config ENC 
dotenv.config();

// mongoDb conncection
conncetDB();

// swagger api config
// swagger api options     
const options = {
    definition:{
        openapi: "3.1.1",
        info:{
            tittle:'Job Portal Application',
            description: 'Node Expressjs Job Portal Application'
        },
        servers: [
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:['./routes/*.js'],
};

const spec = swaggerJSDoc(options)

// rest object
const app = express()

// middlewares
app.use(helmet());
// app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

// homeroute root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);
  
// Port
const PORT = process.env.PORT || 8080
 
// listen
app.listen(PORT, () =>{
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan)
});