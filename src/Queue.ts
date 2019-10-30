import { Move } from './Moves';

export default class Queue {

    private items: Move[] = [];

    addItem(item: Move) {
        this.items.unshift(item);
    }

    nextItem(): Move | undefined {
        return this.items.pop();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
