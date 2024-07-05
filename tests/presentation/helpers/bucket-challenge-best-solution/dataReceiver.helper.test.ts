import { DataReceiver } from "../../../../src/presentation/helpers/bucket-challenge-best-solution/dataReceiver.helper";

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
      results: [
        {
            bucketX: 2,
            bucketY: 0,
            explanation: "Fill bucket X"
        },
        {
            bucketX: 0,
            bucketY: 2,
            explanation: "Transfer from bucket X to bucket Y"
        },
        {
            bucketX: 2,
            bucketY: 2,
            explanation: "Fill bucket X"
        },
        {
            bucketX: 0,
            bucketY: 4,
            explanation: "Transfer from bucket X to bucket Y"
        }
      ],
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
      results: [
        {
          bucketX: 0,
          bucketY: 100,
          explanation: "Fill bucket Y"
        },
        {
          bucketX: 2,
          bucketY: 98,
          explanation: "Transfer from bucket Y to bucket X"
        },
        {
          bucketX: 0,
          bucketY: 98,
          explanation: "Empty bucket X"
        },
        {
          bucketX: 2,
          bucketY: 96,
          explanation: "Transfer from bucket Y to bucket X"
        }
      ],
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

  test('Fourth case with BucketX=2 BucketY=3 AmountWanted=4', () => {

    const bucketX = 2;
    const bucketY = 3;
    const amountWantedZ = 4;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    expect(result).toEqual({
      ok: true,
      isSolutionPossible: false,
      results: [],
    });
  });

  test('Fifth case with BucketX=5 BucketY=2 AmountWanted=2', () => {

    const bucketX = 5;
    const bucketY = 2;
    const amountWantedZ = 2;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    expect(result).toEqual({
      ok: true,
      isSolutionPossible: true,
      results: [
        {
          bucketX: 0,
          bucketY: 2,
          explanation: "Fill bucket Y"
        },
      ],
    });
  });

  test('Sixth case with BucketX=1 BucketY=5 AmountWanted=5', () => {

    const bucketX = 1;
    const bucketY = 5;
    const amountWantedZ = 5;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    expect(result).toEqual({
      ok: true,
      isSolutionPossible: true,
      results: [
        {
          bucketX: 0,
          bucketY: 5,
          explanation: "Fill bucket Y"
        },
      ],
    });
  });

  test('Seventh case with BucketX=11 bucketY=9 AmountWanted=4', () => {
    const bucketX = 11;
    const bucketY = 9;
    const amountWantedZ = 4;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    expect(result).toEqual({
      ok: true,
      isSolutionPossible: true,
      results: [
        {
          bucketY: 0,
          bucketX: 11,
          explanation: "Fill bucket X"
        },
        {
          bucketY: 9,
          bucketX: 2,
          explanation: "Transfer from bucket X to bucket Y"
        },
        {
          bucketY: 0,
          bucketX: 2,
          explanation: "Empty bucket Y"
        },
        {
          bucketY: 2,
          bucketX: 0,
          explanation: "Transfer from bucket X to bucket Y"
        },
        {
          bucketY: 2,
          bucketX: 11,
          explanation: "Fill bucket X"
        },
        {
          bucketY: 9,
          bucketX: 4,
          explanation: "Transfer from bucket X to bucket Y"
        }
      ]});
  });
});