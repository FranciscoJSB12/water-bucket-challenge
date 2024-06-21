# Water Bucket challenge

## Description

Welcome! This is an application created in order to solve the classic Water Jug Riddle. It is a web server built with Node.js that servers a Single Page Application as an user interface made with React.js.
The server is able to received two jugs with different capacities (X gallons and Y gallons) and an amount wanted (Z gallons), so that you can get a response with the step-by-step solution.

## Frontend's Github Repository

To achieve better organization, this project employs a decoupled frontend and backend architecture. Consequently, the public folder only contains a single HTML, CSS, and JavaScript file: these ones are already optimized for production.

If you need the source code, check the link below:

<a href="https://github.com/FranciscoJSB12/water-bucket-challenge-ui/" target="_blank">Frontend GiHub Repository - Source Code</a>

## Technologies

The project structure is inspired by the Nest.js framework, which uses a very well-organized folder structure. This not only makes the application easy to understand but also facilitates maintenance and scalability. The following technologies are part of the tech stack used in this project:

- Node.js
- Express.js
- Typescript

## Algorithmic Approach

In order to solve the Water Bucket Challenge, the proccess was divided into the following steps:

1. Determine if it is possible to solve the problem with the provided data.

- The user can enter X, Y, and Z values that might not have a solution due to the available actions: Fill, Empty, and Transfer. To address this, the server needs to check if the desired final amount is divisible by one of the other container capacities.

- In other words, the final amount must be achievable by filling or emptying the containers completely, not partially, the only time when you fill o empty the bucket partially is when you transfer, however, you transfer an integer amount, not decimal amounts are possible.

- There is another important constraint: the largest bucket must be at least as large as the desired amount. You cannot achieve the goal if the two buckets have a smaller capacity than the final amount you want.

2. Analyze the possible solutions to choose most efficient one.

- You can begin solving the challenge by using either the smallest or the largest bucket first. The optimal choice depends on the desired amount and the buckets' capacities. The question is: which approach will complete the challenge faster?

- We can now compare the number of steps required for each scenario to reach the goal, considering the buckets' capacities and the desired amount. Let's take a look at the following formulas:

```
If you decide to start with the smallest one:

steps = (amountWanted / smallestBucketCapacity) * 2
```

- This gives you the number of times to fill the bucket. However, you need to multiply this number by 2 because every time you fill it, you'll need to empty or transfer the water, unless you achieve the desired amount on your first attempt because the amount wanted and the smallest bucket capacity are equal.

```
Regarding the largest bucket:

steps = [(largestBucketCapacity - amountWanted)/ smallestBucketCapacity] * 2
```

- This formula calculates the steps involved when you start by filling the largest bucket until you reach the desired amount. Remember, the bucket can only be filled or emptied completely. The water can be transferred to the smallest bucket as well. This is why the capacity of the smallest bucket is a factor in determining the steps for the larger one. You also have to multiply by 2 because every time you fill one of the buckets you need to empty or transfer the water to the other, unless the largest bucket's capacity is equal to the desired amount, then you will only need one attempt.

3. After calculating the number of steps for each scenario, compare them to see which one requires less. At this point the game starts, which is a loop and finishes when you reached the desired amount.

## How to run the project

### Development Mode

1. Clone the github repository.
2. Install all the dependencies using `npm install`.
3. Copy and rename the `.env.template` file to `.env` and fill the environment variables.
4. Run `npm run dev` to start the server.
5. Open your favorite browser and type:

```
localhost:PORT/
```

6. Since you previously set the port in the `.env` file, that's the number you need to enter in the PORT field.
7. After that you should see an UI that looks like this:

<p align="center">
    <img src="https://i.imgur.com/I1IvxMW.png" width="300" height="500" title="Application UI">
    <img src="https://i.imgur.com/SR3FRub.png" width="300" height="500" title="Application UI with solution">
</p>

### Production Mode

1. Clone the github repository.
2. Install all the dependencies using `npm install`.
3. Copy and rename the `.env.template` file to `.env` and fill the environment variables.
4. Execute `npm run build`, this comands tests the app and then generates the final version.
5. Run `npm start` and open your brower on `localhost:PORT/` to see the user interface.

### API Documentation

The server also exposes an Enpoint to make POST requests on `http://localhost:PORT/api/bucket-challenge`
You can send request with the following format:

```
{
    "bucketX": integer,
    "bucketY": integer,
    "amountWantedZ": integer
}
```

Only interger values greater than zero are allowed by the server.

## How to test the project

- Run tests without watching file changes:

```
npm run test
```

- Run test watching file changes:

```
npm run test:watch
```

- Generate coverage report:

```
npm run test:coverage
```

### Test Cases for validation

Besides the test cases in the `dataReceiver.helper.test.ts` file you can copy and paste there the following ones inside the describe function:

```
  test('Forth case with BucketX=2 BucketY=3 AmountWanted=4', () => {

    const bucketX = 2;
    const bucketY = 3;
    const amountWantedZ = 4;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    //Expected Outcome
    expect(result).toEqual({
      ok: true,
      isSolutionPossible: false,
      results: [],
    });
  });
```

```
  test('Fifth case with BucketX=5 BucketY=2 AmountWanted=2', () => {

    const bucketX = 5;
    const bucketY = 2;
    const amountWantedZ = 2;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    //Expected Outcome
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
```

```
  test('Fifth case with BucketX=1 BucketY=5 AmountWanted=5', () => {

    const bucketX = 1;
    const bucketY = 5;
    const amountWantedZ = 5;

    const dataReceiver = new DataReceiver();

    const result = dataReceiver.obtainData({ bucketX, bucketY, amountWantedZ });

    //Expected Outcome
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
```
