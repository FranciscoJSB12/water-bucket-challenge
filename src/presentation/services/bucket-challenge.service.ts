import { CalculateChallengeDto, BestPosibleSolutionType } from "../../domain";

//BucketX = 2, BucketY = 10 and AmountWantedZ = 4

export class BucketChallengeService {

  private detemineLargestSmallestNumbers(bucketX: number, bucketY: number) {
    const largestNumber = Math.max(bucketX, bucketY);
    const smallestNumber = Math.min(bucketX, bucketY);
    
    return {
      largestNumber,
      smallestNumber,
    }
  }

  private determineSolutionPosible(challengeData: CalculateChallengeDto) {
    const bucketXModulus = challengeData.amountWantedZ % challengeData.bucketX;
    const bucketYModulus = challengeData.amountWantedZ % challengeData.bucketY;
    const { largestNumber } = this.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);
    const isSolutionPosible = ((bucketXModulus === 0) || (bucketYModulus === 0)) && largestNumber >= challengeData.amountWantedZ; 

    return {
      isSolutionPosible
    }
  }

  private determineMostEfficientSolution(challengeData: CalculateChallengeDto) {
    const { largestNumber, smallestNumber } = this.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);

    const firstPosibleSolution = { 
      count: challengeData.amountWantedZ / smallestNumber,
      smallestNumber,
    };

    const secondPosibleSolution = {
      count: (largestNumber - challengeData.amountWantedZ) / smallestNumber,
      smallestNumber,
      largestNumber,
    };

    let bestPossibleSolution = {} as BestPosibleSolutionType;

    if (firstPosibleSolution.count < secondPosibleSolution.count) {
      bestPossibleSolution = { ...firstPosibleSolution };
    } else {
      bestPossibleSolution = { ...secondPosibleSolution };
    }

    return {
      firstPosibleSolution,
      secondPosibleSolution,
      bestPossibleSolution,
    }
  }

  public executeCalculation(challengeData: CalculateChallengeDto) {
    const { isSolutionPosible } = this.determineSolutionPosible(challengeData);

    if (!isSolutionPosible) {
      return {
        isSolutionPosible
      }
    }

    const { bestPossibleSolution } = this.determineMostEfficientSolution(challengeData);

    return bestPossibleSolution;
    }
}