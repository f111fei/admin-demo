import { Request, Response } from 'express';

type MockCallback = (req: Request, res: Response) => any;

declare global {
    interface MockConfig {
        [key: string]: string | object | MockCallback;
    }
}