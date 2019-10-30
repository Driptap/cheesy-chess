import { Move, MadeMoves, MadeMove, StringPosition } from './Moves';
import Queue from './Queue';

import { yMoves, xMoves } from './helpers';

export interface EventDesc {
    type: EventType;
    data: string;
}

export enum EventType {
    RESET = 'RESET',
    MOVE = 'MOVE'
}

export default class Event {

    private queue: Queue;
    private madeMoves: MadeMoves;
    private startingMove: Move;
    public type: EventType;

    constructor(eventDesc: EventDesc) {
        this.queue = new Queue();
        this.madeMoves = new MadeMoves();
        this.startingMove = new Move(
            Event.parseEventData(eventDesc.data).X,
            Event.parseEventData(eventDesc.data).Y,
            0 // Level in the tree
        );
        this.type = eventDesc.type;
    }

    public movesTo(event: Event): Move[] {

        const source = this.startingMove.numeric();
        const dest = event.startingMove.numeric()

        this.queue.addItem(this.startingMove);
        this.madeMoves.addMove(new MadeMove(this.startingMove));

        while(!this.queue.isEmpty()) {

            const currMove = this.queue.nextItem()!;
            let { X, Y } = currMove.numeric();

            if ( currMove && (X === dest.X && Y === dest.Y) ) {
                return this.pathToDestination(currMove);
            }


            for (let i = 0; i < 8; i++) {
                let nextX = X + xMoves[i];
                let nextY = Y + yMoves[i];
                let potentialMove = new Move(
                    X + xMoves[i],
                    Y + yMoves[i],
                    currMove.level + 1
                );

                if (potentialMove.isValid()
                    && !this.madeMoves.contains(potentialMove)) {
                        this.queue.addItem(potentialMove);
                        const madeMove = new MadeMove(potentialMove, currMove);
                        this.madeMoves.addMove(madeMove);
                }
            }
        }
        return [];
    }

    private pathToDestination(currMove: Move): Move[] {

        const currMadeMove = this.madeMoves.findByMove(currMove);

        if (currMadeMove === undefined) {
            return [];
        } else {
            const pathTaken: MadeMoves = new MadeMoves();

            pathTaken.addMove(currMadeMove);
            if (currMadeMove.previousMove === undefined) {
                return [];
            }

            let previousMadeMove = this.madeMoves.findByMove(currMadeMove.previousMove);
            while (previousMadeMove && !pathTaken.contains(previousMadeMove.move)) {
                pathTaken.addMove(previousMadeMove);
                previousMadeMove = this.madeMoves.findByMove(
                    previousMadeMove.previousMove
                );
            }
            return pathTaken.listMoves();
        }
        return [];
    }

    public static parseEventData(data: string): StringPosition {
        const [x, y] = data.split('');
        return {
            X: x,
            Y: parseInt(y)
        }
    }
}
