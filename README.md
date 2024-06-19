# Water Bucket challenge

## Description

Welcome! This is an application created in order to solve the classic Water Jug Riddle. It is a web server built with Node.js that servers a Single Page Application as an user interface made with React.js.
The server is able to received two jugs with different capacities (X gallons and Y gallons) and an amount wanted (Z gallons), so that you can get a response with the step-by-step solution.

## Tecnologies

The project structure is inspired by the Nest.js framework, which uses a very well-organized folder structure. This not only makes the application easy to understand but also facilitates maintenance and scalability. The following technologies are part of the tech stack used in this project:

- Node.js
- Express.js
- Typescript

<p align="center">
    <img src="https://i.imgur.com/hPSZR44.png" width="350" height="400" title="Bucket icon by surang - Flaticon">
</p>

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

This gives you the number of times to fill the bucket. However, you need to multiply this number by 2 because every time you fill it, you'll need to empty or transfer the water, unless you achieve the desired amount on your first attempt.
```
