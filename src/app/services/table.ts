import { Injectable } from '@angular/core';
import { Player, Card, DeckOfCards } from '../types';

@Injectable({ providedIn: 'root' })
export class TableService {
  private playerOne: Player;
  private playerTwo: Player;
  private _pot: Card[] = [];

  public get pot(): Card[] {
    return this._pot;
  }

  constructor(playerOne: Player, playerTwo: Player) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  public dealCards(): void {
    const cards = DeckOfCards();
    this.playerOne.removeCards();
    this.playerTwo.removeCards();

    for (let i = 0; i < cards.length; i++) {
      if (i % 2 === 0) {
        this.playerOne.take(cards[i]);
      } else {
        this.playerTwo.take(cards[i]);
      }
    }
  }

  // bad
  public switchPlayer(): void {
    if (this.playerOne.active) {
      this.playerTwo.allow();
      this.playerOne.deny();
    } else {
      this.playerOne.allow();
      this.playerTwo.deny();
    }
  }

  public takeCards(player: Player): void {
    player.takeCards(this._pot);
    player.allow();
    if (player.id === this.playerOne.id) {
      this.playerTwo.deny();
    } else {
      this.playerOne.deny();
    }
    this._pot = [];
  }

  public start(): void {
    this.playerOne.allow();
    this.playerTwo.deny();
    this.dealCards();
  }

  public isSnap(): boolean {
    const a = this.pot[this.pot.length - 1];
    const b = this.pot[this.pot.length - 2];
    return !!a && a.value === b?.value;
  }
}
