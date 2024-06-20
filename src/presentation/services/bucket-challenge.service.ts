import { CalculateChallengeDto } from "../../domain";
import { DataAnalyzer, DataShipper } from "../helpers";

export class BucketChallengeService {
  
  private dataAnalyzer = new DataAnalyzer();
  private dataShipper = new DataShipper();

  public executeCalculation(challengeData: CalculateChallengeDto) {
    const { isSolutionPossible } = this.dataAnalyzer.determineSolutionPosible(challengeData);

    if (!isSolutionPossible) {
      return { ok: true, isSolutionPossible, results: [] }
    }

    const solution = this.dataShipper.determineMostEfficientSolution(challengeData);

    const finalSolution = this.dataShipper.indentifyExplanation(solution.result, challengeData.bucketX, challengeData.bucketY);

    return { ok: true ,isSolutionPossible, results: finalSolution };
    }
}