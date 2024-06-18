import { Request, Response } from 'express';

export class BucketChallengeController {
  public getBucketChallengeData = ( req: Request, res: Response ) => {
    res.json({
        message: "Server is working properly"
    });
  };
} 