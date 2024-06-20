import { DataReceiver } from "../../../../src/presentation/helpers/bucket-challenge-best-solution/dataReceiver.helper";
import { firstCase, secondCase } from "../../../../testdata/expectedResult";

describe('Data-Receiver-helper', () => {
  test('First case with BucketX=2 BucketY=10 AmountWanted=4', () => {

    //1. Arrange 
    const bucketX = 2;
    const bucketY = 10;
    const amountWantedZ = 4;

    //2. Act 
    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    //3. Assert
    expect(result).toEqual({
      ok: true,
      isSolutionPossible: true,
      results: firstCase,
    });
  });


  test('Second case with BucketX=2 BucketY=100 AmountWanted=96', () => {

    const bucketX = 2;
    const bucketY = 100;
    const amountWantedZ = 96;

    
    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });
  
    expect(result).toEqual({
      ok: true,
      isSolutionPossible: true,
      results: secondCase,
    });
  });

  test('Third case with BucketX=2 BucketY=6 AmountWanted=5', () => {

    const bucketX = 2;
    const bucketY = 6;
    const amountWantedZ = 5;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    expect(result).toEqual({
      ok: true,
      isSolutionPossible: false,
      results: [],
    });
  });
});