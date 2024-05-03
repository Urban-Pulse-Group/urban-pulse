import { Request, Response } from 'express';
import fetchCensusData from '../services/censusService';

export const getCensusData = async (req: Request, res: Response) => {
    try {
        const data = await fetchCensusData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Census data:', error);
        res.status(500).json({ error: 'Error fetching Census data' });
    }
};