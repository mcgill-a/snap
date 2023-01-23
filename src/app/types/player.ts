import { shuffle } from 'lodash';
import { Observable, of } from 'rxjs';
import { Card } from './card';

export class Player {
  private _id: string;
  private _cards: Card[];
  private _active = false;

  public get active(): boolean {
    return this._active;
  }

  public get cards(): number {
    return this._cards.length;
  }

  public get id(): string {
    return this._id;
  }

  constructor(id: string) {
    this._id = id;
    this._cards = [];
  }

  public allow(): void {
    this._active = true;
  }

  public deny(): void {
    this._active = false;
  }

  public getCard(): Observable<Card | undefined> {
    return of(this._cards.shift());
  }

  public playCard(): Card | undefined {
    return this._cards.shift();
  }

  public removeCards(): void {
    this._cards = [];
  }

  public take(card: Card): void {
    this._cards.push(card);
  }

  public takeCards(cards: Card[]): void {
    this._cards = [...this._cards, ...cards];
  }

  public shuffleCards(): void {
    this._cards = shuffle(this._cards);
  }
}
