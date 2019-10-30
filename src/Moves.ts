import { letterToNumber, numberToLetter, SIZE, allowedAlphaPositions } from './helpers';

type NumericPosition = { X: number, Y: number };
export type StringPosition = { X: string; Y: number };

abstract class BoardPosition {
    public X: string;
    constructor(X: any, public Y: number) {
        if (!isNaN(X)) {
            this.X = numberToLetter(parseInt(X));
        } else {
            this.X = X;
        }
    }

    public numeric(): NumericPosition {
        return {
            X: letterToNumber(this.X),
            Y: this.Y
        };
    }

    public isValid(): boolean {
        return (
            allowedAlphaPositions.includes(this.X)
            && (this.Y >= 0 && this.Y < SIZE)
        );
    }
}

export class Move extends BoardPosition {
    constructor(X: any, Y: number, public level: number) {
        super(X, Y);
    }
}

export class MadeMove {
    constructor(public move: Move, public previousMove?: Move | undefined) {}
}

export class MadeMoves {
    private moves: MadeMove[] = [];
    public addMove(move: MadeMove): void {
        this.moves.push(move);
    }

    public contains(move: Move): boolean {
        return this.findByMove(move) !== undefined
    }

    public findByMove(move: Move | undefined): MadeMove | undefined {
        return this.moves.find((madeMove: MadeMove) => {
            return move === madeMove.move
        });
    }

    public listMoves(): Move[] {
        return this.moves
            .sort((a, b) => a.move.level - b.move.level)
            .map((madeMove) => madeMove.move)
    }
}
