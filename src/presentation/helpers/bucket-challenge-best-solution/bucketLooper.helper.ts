import { BucketChallengeSolution } from "../../../domain";

export class BucketLooper {

    public fillSmallest = 'Fill smallest';
    public transfFromSmallestToLargest = 'Transfer from smallest to largest';
    public fillLargest = 'Fill largest';
    public tranfFromLargestToSmallest = 'Transfer from largest to smallest';
    public emptySmallest = 'Empty smallest';

    public iterateForSpecialCase(smallestNumber: number, largestNumber: number, amountWanted: number): BucketChallengeSolution[] {
      let smallestBucketCount: number = 0;
      let largestBucketCount: number = 0;
      const results: BucketChallengeSolution[] = [];

      while(largestBucketCount !== amountWanted) {

        if (largestBucketCount === 0) {
          largestBucketCount += largestNumber;
          results.push({
            smallestBucketCount,
            largestBucketCount,
            explanation: this.fillLargest,
          });
          continue;
        }

        if (largestBucketCount === largestNumber && smallestBucketCount === 0) {
          largestBucketCount -= smallestNumber;
          smallestBucketCount += smallestNumber;
          results.push({
            smallestBucketCount,
            largestBucketCount,
            explanation: this.tranfFromLargestToSmallest
          });
          continue;
        }

        if (smallestBucketCount === smallestNumber) {
          smallestBucketCount = 0;
          results.push({
            smallestBucketCount,
            largestBucketCount,
            explanation: this.emptySmallest
          });
          continue;
        }

        if (smallestBucketCount === 0 && largestBucketCount <= smallestNumber) {
          smallestBucketCount += largestBucketCount;
          largestBucketCount = 0;
          results.push({
            smallestBucketCount,
            largestBucketCount,
            explanation: this.tranfFromLargestToSmallest
          });
          continue;
        }

        if (largestBucketCount === largestNumber && smallestBucketCount <= smallestNumber) {
          const difference = (smallestNumber - smallestBucketCount);
          largestBucketCount -= difference;
          smallestBucketCount += difference;
          results.push({
            smallestBucketCount,
            largestBucketCount,
            explanation: this.tranfFromLargestToSmallest
          });
        }
      }

      return results;
    }

    public startWithSmallestBucket(count: number, smallestNumber: number, largestNumber: number): BucketChallengeSolution[] {

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
                explanation: this.fillSmallest
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
                explanation: this.transfFromSmallestToLargest
              }
            );
          }
        }
    
        return resultsUsingSmallestBucket;
      }
    
      public startWithLargestBucket(count: number, smallestNumber: number, largestNumber: number): BucketChallengeSolution[] {
        
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
                explanation: this.fillLargest
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
              explanation: this.tranfFromLargestToSmallest,
            });
            continue;
          }
    
          if (smallestBucketCount === smallestNumber) {
            smallestBucketCount -= smallestNumber;
            resultsUsingLargestBucket.push({ 
              smallestBucketCount,
              largestBucketCount,
              explanation: this.emptySmallest,
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
                explanation: this.tranfFromLargestToSmallest
              }
            );
          }
        }
    
        return resultsUsingLargestBucket;
      }
}