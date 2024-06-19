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

- The user can enter X, Y, and Z values that might not have a solution due to the available actions: Fill, Empty, and Transfer. To address this, the server needs to check if the desired final amount is divisible by one of the other container capacities. In other words, the final amount must be achievable by filling or emptying the containers completely, not partially, even when you transfer, you transfer an integer amount, not decimal amounts are possible.
- There is another important constraint: the largest bucket must be at least as large as the desired amount. You cannot achieve the goal if the two buckets have a smaller capacity than the final amount you want.
