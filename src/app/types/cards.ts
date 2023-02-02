import { shuffle } from 'lodash';
import { Card } from './card';

export class Cards {
  private _cards: Card[];

  public get count(): number {
    return this._cards.length;
  }

  constructor() {
    this._cards = [];
  }

  public add(cards: Card[]): void {
    this._cards = [...this._cards, ...cards];
  }

  public get(): Card | undefined {
    return this._cards.shift();
  }

  public clear(): void {
    this._cards = [];
  }

  public shuffle(): void {
    this._cards = shuffle(this._cards);
  }
}
