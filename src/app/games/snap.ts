import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, Subscription, merge, map } from 'rxjs';
import { isNotNullOrUndefined } from '../utils';
import { Card, DeckOfCards } from '../types/card';
import { Action, Player } from '../types/player';
import { Cards } from '../types/cards';

interface PlayerAction {
  player: Player;
  action: Action;
}

interface State {
  ref: StateRef;
  player: Player;
}

export interface PlayCard extends State {
  ref: StateRef.CARD;
  card: Card;
}

export interface Winner extends State {
  ref: StateRef.WINNER;
}

export interface CallSnap extends State {
  ref: StateRef.SNAP;
}

export type StateChange = PlayCard | Winner | CallSnap;

export enum StateRef {
  'CARD' = 'CARD',
  'SNAP' = 'SNAP',
  'WINNER' = 'WINNER',
}

@Injectable({ providedIn: 'root' })
export class Snap implements OnDestroy {
  private subs = new Subscription();
  private _pot: Card[];
  private _playerOne = new Player('Player One', new Cards());
  private _playerTwo = new Player('Player Two', new Cards());
  private _activePlayer: Player;
  private _change = new BehaviorSubject<StateChange | undefined>(void 0);

  private get isSnap(): boolean {
    const a = this._pot[this._pot.length - 1];
    const b = this._pot[this._pot.length - 2];
    return !!a && a.value === b?.value;
  }

  public get playerOne(): Player {
    return this._playerOne;
  }
  public get playerTwo(): Player {
    return this._playerTwo;
  }
  public get activePlayer(): Player {
    return this._activePlayer;
  }

  public readonly change = this._change
    .asObservable()
    .pipe(filter(isNotNullOrUndefined));

  constructor() {
    this._activePlayer = this.playerOne;
    this._pot = [];
    this.init();

    const actions = merge(
      this._playerTwo.action.pipe(
        map((action) => <PlayerAction>{ player: this._playerTwo, action })
      ),
      this._playerOne.action.pipe(
        map((action) => <PlayerAction>{ player: this._playerOne, action })
      )
    );

    const actionSub = actions.subscribe((update) => {
      switch (update.action) {
        case Action.Card:
          if (update.player.id === this.activePlayer.id && !this.isSnap) {
            const player = update.player;
            const card = player.cards.get();
            if (!card) return;
            this._pot.push(card);
            this._change.next({ ref: StateRef.CARD, player, card });
            this.switchPlayer();
          }
          break;
        case Action.Snap:
          if (this.isSnap) {
            const player = update.player;
            player.cards.add(this._pot);
            this._pot = [];
            this._change.next({ ref: StateRef.SNAP, player });
            this._activePlayer = update.player;
          }
          break;
      }
    });

    this.subs.add(actionSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private init(): void {
    this.deal(DeckOfCards());
  }

  private switchPlayer(): void {
    this._activePlayer =
      this.activePlayer.id === this.playerOne.id
        ? this.playerTwo
        : this.playerOne;
  }

  public deal(cards: Card[]): void {
    this.playerOne.cards.clear();
    this.playerTwo.cards.clear();

    for (let i = 0; i < cards.length; i++) {
      if (i % 2 === 0) {
        this.playerOne.cards.add([cards[i]]);
      } else {
        this.playerTwo.cards.add([cards[i]]);
      }
    }
  }
}
