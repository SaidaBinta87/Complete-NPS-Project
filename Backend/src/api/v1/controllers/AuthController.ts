import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserService.register(username, password);
      res.status(201).json({ user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  }


  static async logout(req: Request, res: Response): Promise<void> {
    try {
    
      // Clear the token from session or cookies in the frontend
      // No need to handle token clearing in the backend

      // Respond with a success message
      res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
  
}
