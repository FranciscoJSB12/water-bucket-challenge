import { Router } from 'express';
import { BucketChallengeRoutes } from './bucket-challenge/routes';

export class AppRoutes {
    static get routes(): Router {

    const router = Router();

    router.use('/api/bucket-challenge', BucketChallengeRoutes.routes);
    
    return router;
  }
}