import { CalculateChallengeDto, BucketChallengeSolution, Bucket } from "../../domain";

export class BucketChallengeService {
  private detemineLargestSmallestNumbers(bucketX: number, bucketY: number) {
    const largestNumber = Math.max(bucketX, bucketY);
    const smallestNumber = Math.min(bucketX, bucketY);
    let smallestBucketData = {} as Bucket;
    let largestBucketData = {} as Bucket;

    if (smallestNumber === bucketX) {
      smallestBucketData = { name: 'smallest', value: smallestNumber, bucket: 'X' };
      largestBucketData = { name: 'largest', value: largestNumber, bucket: 'Y' };
    } else {
      smallestBucketData = { name: 'smallest', value: smallestNumber, bucket: 'Y' };
      largestBucketData = { name: 'largest', value: largestNumber, bucket: 'X' };
    }

    return { 
      largestNumber, 
      smallestNumber,
      smallestBucketData,
      largestBucketData,
    };
  }

  private determineSolutionPosible(challengeData: CalculateChallengeDto) {
    const bucketXModulus = challengeData.amountWantedZ % challengeData.bucketX;
    const bucketYModulus = challengeData.amountWantedZ % challengeData.bucketY;

    const { largestNumber } = this.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);

    const isSolutionPosible = ((bucketXModulus === 0) || (bucketYModulus === 0)) && largestNumber >= challengeData.amountWantedZ; 

    return { isSolutionPosible };
  }

  private iterateWithSmallestBucket(count: number, smallestNumber: number, largestNumber: number) {
    let smallestBucketCount: number = 0;
    let largestBucketCount: number = 0;
    const resultsUsingSmallestBucket: BucketChallengeSolution[] = [];

    for(let i = 1; i <= count; i++) {
      if (smallestBucketCount === 0) { 
        smallestBucketCount += smallestNumber;
        resultsUsingSmallestBucket.push(
          { 
            smallestBucketCount, 
            largestBucketCount, 
            explanation: 'Fill smallest'
          }
        );
        continue;
      };

      if (smallestBucketCount === smallestNumber && largestBucketCount < largestNumber) {
        smallestBucketCount -= smallestNumber;
        largestBucketCount += smallestNumber;
        resultsUsingSmallestBucket.push(
          { 
            smallestBucketCount, 
            largestBucketCount, 
            explanation: 'Transfer from smallest to largest'
          }
        );
      }
    }

    return resultsUsingSmallestBucket;
  }

  private iterateWithLargestBucket(count: number, smallestNumber: number, largestNumber: number) {
    let smallestBucketCount: number = 0;
    let largestBucketCount: number = 0;
    const resultsUsingLargestBucket: BucketChallengeSolution[] = [];

    for(let j = 1; j <= count; j++) {
      if (largestBucketCount === 0) {
        largestBucketCount += largestNumber;
        resultsUsingLargestBucket.push(
          { 
            smallestBucketCount, 
            largestBucketCount, 
            explanation: 'Fill largest'
          }
        );
        continue;
      }

      if (largestBucketCount === largestNumber) {
        largestBucketCount -= smallestNumber;
        smallestBucketCount += smallestNumber;
        resultsUsingLargestBucket.push({
          smallestBucketCount,
          largestBucketCount,
          explanation: 'Transfer from largest to smallest'
        });
        continue;
      }

      if (smallestBucketCount === smallestNumber) {
        smallestBucketCount -= smallestNumber;
        resultsUsingLargestBucket.push({ 
          smallestBucketCount,
          largestBucketCount,
          explanation: 'Empty smallest'
        });
        continue;
      }

      if (smallestBucketCount === 0) {
        smallestBucketCount += smallestNumber;
        largestBucketCount -= smallestNumber;
        resultsUsingLargestBucket.push(
          {
            smallestBucketCount,
            largestBucketCount,
            explanation: 'Transfer from largest to smallest'
          }
        );
      }
    }

    return resultsUsingLargestBucket;
  }

  private determineMostEfficientSolution(challengeData: CalculateChallengeDto) {
    const { largestNumber, smallestNumber } = this.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);

    const firstPosibleSolutionCount = challengeData.amountWantedZ !== smallestNumber ? (challengeData.amountWantedZ / smallestNumber) * 2 : 1;
    const secondPosibleSolutionCount = ((largestNumber - challengeData.amountWantedZ) / smallestNumber) * 2 || 1;

    if (firstPosibleSolutionCount <= secondPosibleSolutionCount) {
      const resultsUsingSmallestBucket = this.iterateWithSmallestBucket(firstPosibleSolutionCount, smallestNumber, largestNumber);

      return {
        result: resultsUsingSmallestBucket,
        areSolutionsEqualToEachOther: firstPosibleSolutionCount === secondPosibleSolutionCount,
      }
    }

    const resultsUsingLargestBucket = this.iterateWithLargestBucket(secondPosibleSolutionCount, smallestNumber, largestNumber);

    return {
      result: resultsUsingLargestBucket,
    }
  }

  private indentifyExplanation(results: BucketChallengeSolution[], bucketXValue: number, bucketYValue: number) {
    const { smallestBucketData, largestBucketData } = this.detemineLargestSmallestNumbers(bucketXValue, bucketYValue);

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

  public executeCalculation(challengeData: CalculateChallengeDto) {
    const { isSolutionPosible } = this.determineSolutionPosible(challengeData);

    if (!isSolutionPosible) {
      return { isSolutionPosible, results: [] }
    }

    const solution = this.determineMostEfficientSolution(challengeData);

    const finalSolution = this.indentifyExplanation(solution.result, challengeData.bucketX, challengeData.bucketY);

    return { isSolutionPosible, results: finalSolution };
    }
}