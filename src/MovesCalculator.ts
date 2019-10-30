import { StringPosition, Move } from './Moves';
import Queue from './Queue';
import Event, { EventType, EventDesc } from './Event';

import * as Helpers from './helpers';

export default class MovesCalculator {

    private events: Event[];
    constructor(moves: EventDesc[]) {
        this.events = moves.map((event) => new Event(event));
    }

    public movesToTarget(): Move[][] {
        return this.events.reduce((col: Move[][], event: Event, idx: number): Move[][] => {
            if (this.events[idx + 1] && this.events[idx + 1].type !== EventType.RESET) {
                col = [
                    ...col,
                    event.movesTo(this.events[idx + 1])
                ];
            }
            return col;
        }, []);
    }
}
