import { CalculateChallengeDto, BucketChallengeSolution } from "../../../domain";
import { DataAnalyzer } from "./dataAnalyzer.helper";
import { BucketLooper } from "./bucketLooper.helper";

export class DataShipper {
  
  private dataAnalyzer = new DataAnalyzer();
  private bucketLooper = new BucketLooper();
  
  public determineMostEfficientSolution(challengeData: CalculateChallengeDto) {

    const { largestNumber, smallestNumber } = this.dataAnalyzer.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);

    if (largestNumber > challengeData.amountWantedZ && smallestNumber > challengeData.amountWantedZ) {
      const results = this.bucketLooper.iterateForSpecialCase(smallestNumber, largestNumber, challengeData.amountWantedZ);

      return {
        result: results,
      }
    }

    const firstPosibleSolutionCount = challengeData.amountWantedZ !== smallestNumber ? (challengeData.amountWantedZ / smallestNumber) * 2 : 1;

    const secondPosibleSolutionCount = ((largestNumber - challengeData.amountWantedZ) / smallestNumber) * 2 || 1;

    if (firstPosibleSolutionCount <= secondPosibleSolutionCount) {
      const resultsUsingSmallestBucket = this.bucketLooper.startWithSmallestBucket(firstPosibleSolutionCount, smallestNumber, largestNumber);

      return {
        result: resultsUsingSmallestBucket,
      }
    }

    const resultsUsingLargestBucket = this.bucketLooper.startWithLargestBucket(secondPosibleSolutionCount, smallestNumber, largestNumber);

    return {
      result: resultsUsingLargestBucket,
    }
  }

  public indentifyExplanation(results: BucketChallengeSolution[], bucketXValue: number, bucketYValue: number) {
    
    const { smallestBucketData, largestBucketData } = this.dataAnalyzer.detemineLargestSmallestNumbers(bucketXValue, bucketYValue);

    const partialResult = results.map(result => ({
      smallestBucketCount: {
        bucket: `bucket${smallestBucketData.bucket}`,
        count: result.smallestBucketCount,
      },
      largestBucketCount: {
        bucket: `bucket${largestBucketData.bucket}`,
        count: result.largestBucketCount,
      },
      action: {
        name: 'explanation',
        value: result.explanation.replace(smallestBucketData.name, `bucket ${smallestBucketData.bucket}`).replace(largestBucketData.name, `bucket ${largestBucketData.bucket}`)
      },
    }));

    return partialResult.map(result => (
      {
        [result.smallestBucketCount.bucket]: result.smallestBucketCount.count,
        [result.largestBucketCount.bucket]: result.largestBucketCount.count,
        [result.action.name]: result.action.value,
      }
    ));
  }
}