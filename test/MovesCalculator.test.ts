import { EventType } from '../src/Event';
import { Move } from '../src/Moves';
import MovesCalculator from '../src/MovesCalculator';

describe('Moves calculator', () => {
    [
        {
            expectedResult: [
                ['A1', 'B3', 'C5'],
                ['C5', 'D3', 'E1'],
                ['A1', 'B3', 'C5'],
                ['C5', 'D3', 'E1']
            ],
            moves: [
                {
                    type: EventType.RESET,
                    data: 'A1'
                },
                {
                    type: EventType.MOVE,
                    data: 'C5'
                },
                {
                    type: EventType.MOVE,
                    data: 'E1'
                },
                {
                    type: EventType.RESET,
                    data: 'A1'
                },
                {
                    type: EventType.MOVE,
                    data: 'C5'
                },
                {
                    type: EventType.MOVE,
                    data: 'E1'
                }
            ]
        },
        {
            expectedResult: [
                ['H8', 'G6', 'H4', 'G2', 'E3', 'C2', 'A1']
            ],
            moves: [
                {
                    type: EventType.RESET,
                    data: 'H8'
                },
                {
                    type: EventType.MOVE,
                    data: 'A1'
                }
            ]
        },
        {
            expectedResult: [
                ['A1', 'B3', 'C1', 'A2']
            ],
            moves: [
                {
                    type: EventType.RESET,
                    data: 'A1'
                },
                {
                    type: EventType.MOVE,
                    data: 'A2'
                }
            ]
        }
    ].forEach((testCase, idx) => {
        test(`should produce the correct result for test case ${idx + 1}`, () => {
            expect(
                new MovesCalculator(testCase.moves)
                    .movesToTarget()
                    .reduce((col: string[][], moves: Move[]) => {
                        return [
                            ...col,
                            moves.map(m => m.X + m.Y)
                        ]
                    }, [])
            ).toEqual(
                testCase.expectedResult
            );
        });
    });
});
