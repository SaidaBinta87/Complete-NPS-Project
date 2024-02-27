// analyticsController.ts

import { Request, Response } from 'express';
import * as analyticsService from '../services/AnalyticsService';

export const getNpsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const npsData = await analyticsService.getNpsData();
    res.json(npsData);
  } catch (error) {
    console.error('Error fetching NPS data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSurveyStatusData = async (req: Request, res: Response): Promise<void> => {
  try {
    const surveyStatusData = await analyticsService.getSurveyStatusData();
    res.json(surveyStatusData);
  } catch (error) {
    console.error('Error fetching survey status data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentFiles = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId; // Assuming userId is passed as a URL parameter
      const recentFiles = await analyticsService.getRecentFiles(userId);
      res.json(recentFiles);
    } catch (error) {
      console.error('Error fetching recent files:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
