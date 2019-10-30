export const SIZE = 8;

export const xMoves: number[] = [1, 1, -1, -1, -2, 2, -2, 2];
export const yMoves: number[] = [-2, 2, -2, 2, 1, 1, -1, -1];

export const numberToLetter = (num: number): string => String.fromCharCode(97 + num).toUpperCase();
export const letterToNumber = (letter: string): number => letter.toLowerCase().charCodeAt(0) - 97;

export const allowedAlphaPositions = (() => {
    const alphaPositions = [];
    for (let i = 0; i < SIZE; i++) {
        alphaPositions.push(numberToLetter(i));
    }
    return alphaPositions;
})();

