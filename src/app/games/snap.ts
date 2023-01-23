import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { isNotNullOrUndefined } from '../utils';
import { Card } from '../types/card';
import { Player } from '../types/player';
import { TableService } from '../services/table';

export enum KeyCode {
  a = 'KeyA',
  d = 'KeyD',
  left = 'ArrowLeft',
  right = 'ArrowRight',
}

export type Status = 'Playing' | 'Done';

export interface GameState {
  card?: Card;
  status: Status;
}

@Injectable({ providedIn: 'root' })
export class Snap implements OnDestroy {
  private subs = new Subscription();

  private _playerOne = new Player('Player One');
  private _playerTwo = new Player('Player Two');

  public get playerOne(): Player {
    return this._playerOne;
  }

  public get playerTwo(): Player {
    return this._playerTwo;
  }

  private table: TableService;

  private _snap = new Subject<Player>();
  private _next = new Subject<Player>();
  private _state = new BehaviorSubject<GameState | undefined>(void 0);

  public readonly state = this._state
    .asObservable()
    .pipe(filter(isNotNullOrUndefined));

  constructor() {
    this.table = new TableService(this._playerOne, this._playerTwo);

    this.subs.add(
      this._snap.subscribe((player) => {
        if (this.table.isSnap()) {
          this.table.takeCards(player);
          this._state.next({ status: 'Playing' });
        }
      })
    );

    this.subs.add(
      this._next
        .pipe(
          filter((player) => player.active),
          filter(() => !this.table.isSnap()),
          filter(() => this._state.value?.status !== 'Done'),
          switchMap((player) => player.getCard()),
          filter(isNotNullOrUndefined)
        )
        .subscribe((card) => {
          this.table.pot.push(card);
          this._state.next({ card, status: 'Playing' });
          this.table.switchPlayer();
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public next(player: Player): void {
    this._next.next(player);
  }

  public snap(player: Player): void {
    this._snap.next(player);
  }

  public start(): void {
    this._state.next({ status: 'Playing' });
    this.table.start();
  }
}
