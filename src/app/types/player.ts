import { Subject } from 'rxjs';
import { Cards } from './cards';

export enum PlayerId {
  'One' = 'Player One',
  'Two' = 'Player Two',
}

export enum Action {
  Snap,
  Card,
}

export class Player {
  private _action = new Subject<Action>();

  public readonly action = this._action.asObservable();

  public get id(): PlayerId {
    return this._id;
  }

  public get cards(): Cards {
    return this._cards;
  }

  public card(): void {
    this._action.next(Action.Card);
  }

  public snap(): void {
    this._action.next(Action.Snap);
  }

  constructor(private _id: PlayerId, private _cards: Cards) {}
}
