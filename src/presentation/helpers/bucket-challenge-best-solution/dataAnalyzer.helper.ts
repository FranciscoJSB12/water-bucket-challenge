import { Bucket, CalculateChallengeDto } from "../../../domain";

export class DataAnalyzer {

    public readonly smallest = 'smallest';
    public readonly largest = 'largest';
    public readonly bucketX = 'X';
    public readonly bucketY = 'Y';

    public detemineLargestSmallestNumbers(bucketX: number, bucketY: number) {
      
        const largestNumber = Math.max(bucketX, bucketY);
        const smallestNumber = Math.min(bucketX, bucketY);
        let smallestBucketData = {} as Bucket;
        let largestBucketData = {} as Bucket;
    
        if (smallestNumber === bucketX) {
          smallestBucketData = { name: this.smallest, value: smallestNumber, bucket: this.bucketX };
          largestBucketData = { name: this.largest, value: largestNumber, bucket: this.bucketY };
        } else {
          smallestBucketData = { name: this.smallest, value: smallestNumber, bucket: this.bucketY };
          largestBucketData = { name: this.largest, value: largestNumber, bucket: this.bucketX };
        }
    
        return { 
          largestNumber, 
          smallestNumber,
          smallestBucketData,
          largestBucketData,
        };
      }
    
      public determineSolutionPosible(challengeData: CalculateChallengeDto) {

        const bucketXModulus = challengeData.amountWantedZ % challengeData.bucketX;
        const bucketYModulus = challengeData.amountWantedZ % challengeData.bucketY;
    
        const { largestNumber, smallestNumber } = this.detemineLargestSmallestNumbers(challengeData.bucketX, challengeData.bucketY);
    
        let isSolutionPossible = ((bucketXModulus === 0) || (bucketYModulus === 0)) && largestNumber >= challengeData.amountWantedZ; 

        isSolutionPossible = isSolutionPossible ? isSolutionPossible : 2 * (largestNumber - smallestNumber) === challengeData.amountWantedZ;
    
        return { isSolutionPossible };
      }
}