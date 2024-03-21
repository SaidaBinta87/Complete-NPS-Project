import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import connectMongoDb from './lib/database/mongodb';
import { RatingRoute } from './api/v1/routes/RatingRoute'; // Import RatingRoute directly
import {authRouter} from './api/v1/routes/AuthRoute';
import {ExcelRouter} from './api/v1/routes/ExcelRoute';
import { SurveyRouter } from './api/v1/routes/SurveyRoute';
import { ExcelcRouter } from './api/v1/routes/ExcelcRoute';
import { UploadRouter } from './api/v1/routes/UploadRoute';
import { NpsRoute } from './api/v1/routes/NpsRoute';
import AnalyticsRoute from './api/v1/routes/AnalyticsRoute';
import { DSurveyRouter } from './api/v1/routes/DSurveyRoute';
import { surveyResponseRouter } from './api/v1/routes/SurveyResponseRoute';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.connectToDatabase();
    this.routes();
  }

  private config() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(json({ limit: '2mb' }));
  }

  

  private connectToDatabase() {
    connectMongoDb();
  }

  private routes() {
    // Use the RatingRoute directly
    this.app.use('/api/v1/ratings', RatingRoute); // Assuming RatingRoute defines '/post-rating' and '/post-feedback' routes
    this.app.use('/api/v1/admin', authRouter);
    this.app.use('/api/v1/excel',  ExcelRouter);
    this.app.use('/api/v1/surveycreate',  SurveyRouter);
    this.app.use('/api/v1/excelc',  ExcelcRouter);
    this.app.use('/api/v1/upload', UploadRouter);
    this.app.use('/api/v1/nps', NpsRoute);
    this.app.use('/api/v1/dashboard', AnalyticsRoute);
    this.app.use('/api/v1/dynamicSurvey', DSurveyRouter);
    this.app.use('/api/v1/response', surveyResponseRouter);
  }
}

export default new App().app;
