# Shortest Path for the ♞

This little command line tool aims to find the shortest path for a Knight to take through a series of moves.

It is written with *TypeScript* and tests are run with *Jest* and it runs as a script with *NodeJS*.

### Prequisites
NodeJS, it was developed with version 10.

### Setup

1. Clone the repo.
2. Run `npm i` to install the dependencies.
3. Run `npm run build` to transpile to typescript.
4. Run `npm t` to run the tests.

### Usage
From the command line, move to the newly created dist folder with ```cd dist/```

Then use ```node index.js``` to run the script. Instructions are provided at runtime on how to interact.

You'll need a file containing ♞ move events, there is an example file in the root of this repo called `exampleMoves.json` that you can use with the script or as a template.

Run the script with this file using:
```
node index.js -p ../exampleMoves.json
```

### Next Steps
1. Further unit test coverage of Event and collection of Moves classes.
2. Better handling of event types in the MovesCalculator class.
