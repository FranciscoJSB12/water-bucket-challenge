import { Router } from 'express';
import { BucketChallengeController } from './controller';

export class BucketChallengeRoutes {
  static get routes(): Router {

    const router = Router();

    const bucketChallengeController = new BucketChallengeController();

    router.post('/', bucketChallengeController.getBucketChallengeData);

    return router;
  }
}
