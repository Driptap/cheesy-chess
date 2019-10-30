import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';

import MovesCalculator from './MovesCalculator';
import Event, { EventDesc, EventType } from './Event';
import { SIZE, allowedAlphaPositions } from './helpers';

console.log('\r\n');
console.log(chalk.yellowBright.bold('Hello!'));
console.log(chalk.yellowBright('Please specify a path to a JSON file containing some chess moves.'));
console.log('\r\n');
const options = yargs
 .usage("Usage: -p <path>")
 .option("p", {
     alias: "path",
     describe: "Path to the JSON file containing your desired ♞ moves",
     type: "string",
     demandOption: true
 })
 .argv;

function sanitize(moves: EventDesc[]): EventDesc[] {
    return moves.filter((event: EventDesc) => {
        if (!(event.type in EventType)) {
            console.log(chalk.redBright(
                `I found an event with the name ${event.type} and i\'m not sure `
                + `what do to with it, so i\'m going to leave it out.`
            ));
            return false;
        } else {
            const parsedEvent = Event.parseEventData(event.data);
            if (!allowedAlphaPositions.includes(parsedEvent.X.toUpperCase())) {
                console.log(chalk.redBright(
                    `I found an event with a position that is not on my chess board ` +
                    `${parsedEvent.X}${parsedEvent.Y} so i\'m going to leave it out.`
                ));
                return false;
            } else
            if (parsedEvent.Y >= SIZE) {
                console.log(chalk.redBright(
                    `I found an event with a position that is not on my chess board ` +
                    `${parsedEvent.X}${parsedEvent.Y} so i\'m going to leave it out.`
                ));
                return false;
            }
            return true;
        }
    });
}

if (!options.path) {
    console.log(chalk.redBright.bold('Looks like you forgot to specify a file path.'));
    console.log(chalk.redBright.bold('Please run this script with --help for instructions.'));
    process.exit(1);
}

let file = '';
try {
    file = fs.readFileSync(String(options.path)).toString();
} catch (err) {
    console.log(chalk.redBright.bold('I couldn\'t read that file, is it in the right format?'));
    console.log(chalk.yellowBright.bold('It should look like this: '));
    console.log(chalk.white(`
        [
           {
              "type": "RESET",
              "data": "A1"
           },
           {
              "type": "MOVE",
              "data": "C5"
           },
           {
              "type": "MOVE",
              "data": "E1"
           }
        ]
    `));
    process.exit(1);
}

let moves: EventDesc[];
let attemptingBadJson = false;
try {
    moves = JSON.parse(file.toString());
} catch (err) {
    console.log(chalk.yellowBright.bold('I had some trouble parsing that file! I\'ll try and work with it...'));
    moves = file as unknown as EventDesc[];
    attemptingBadJson = true;
}

try {
    const sanitizedMoves = sanitize(moves);
    const movesCalculator: MovesCalculator = new MovesCalculator(sanitizedMoves);
    const movesToTarget = movesCalculator.movesToTarget();
    if (!movesToTarget.length) {
        console.log('\n');
        console.log(chalk.yellowBright.bold('I couldn\'t find any moves!'));
        process.exit(1);
    }
    console.log('\n');
    console.log(chalk.greenBright.bold('I think i\'ve got it.'));
    console.log('\n');
    movesToTarget.forEach(moves => {
        console.log(chalk.greenBright(`Moving from ${moves[0].X}${moves[0].Y} to `
            + `${moves[moves.length-1].X}${moves[moves.length-1].Y} took `
            + `${moves[moves.length-1].level + 1} moves.`));
        console.log(chalk.greenBright(`and it went through positions ${moves.map(m => m.X + m.Y).join(' ⇨ ')}`));
        console.log('\n');
    });
} catch (err) {
    if (attemptingBadJson) {
        console.log(chalk.redBright.bold('I tried and I failed!'));
    } else {
        console.log(chalk.redBright.bold('Oh no, something went very wrong'));
        console.error(err);
    }
}
