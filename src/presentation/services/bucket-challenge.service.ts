import { CalculateChallengeDto } from "../../domain";
import { DataReceiver } from "../helpers/bucket-challenge-best-solution/dataReceiver.helper";


export class BucketChallengeService {
  
  private readonly dataReceiver = new DataReceiver();

  public executeCalculation (challengeData: CalculateChallengeDto) {
    return this.dataReceiver.obtainData(challengeData);
  }
}