import { Request, Response } from 'express';
import { BucketChallengeService } from '../services/bucket-challenge.service';
import { CalculateChallengeDto } from '../../domain/dtos';

export class BucketChallengeController {

  constructor(
    private readonly bucketChallengeService = new BucketChallengeService(),
  ){}

  public getBucketChallengeData = ( req: Request, res: Response ) => {
    const [error, challengeData] = CalculateChallengeDto.calculateChallenge(req.body);

    if (error) return res.status(400).json({ ok: false, message: error });

    res.json(this.bucketChallengeService.executeCalculation(challengeData));
  };
} 