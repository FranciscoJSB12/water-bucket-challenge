import { Request, Response } from 'express';
import { BucketChallengeService } from '../services/bucket-challenge.service';

export class BucketChallengeController {

  constructor(
    private readonly bucketChallengeService = new BucketChallengeService(),
  ){}

  public getBucketChallengeData = ( req: Request, res: Response ) => {
    res.json(this.bucketChallengeService.executeCalculation());
  };
} 