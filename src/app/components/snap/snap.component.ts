import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Snap, StateChange, StateRef } from 'src/app/games/snap';
import { Player, PlayerId } from 'src/app/types';
import { Card } from 'src/app/types/card';
import { CardComponent } from '../card/card.component';

export enum KeyCode {
  a = 'KeyA',
  d = 'KeyD',
  left = 'ArrowLeft',
  right = 'ArrowRight',
}

export enum Animation {
  'Ready' = 'READY',
  'EnterLeft' = 'ENTER_LEFT',
  'EnterRight' = 'ENTER_RIGHT',
  'ExitLeft' = 'EXIT_LEFT',
  'ExitRight' = 'EXIT_RIGHT',
}

@Component({
  selector: 'fido-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss'],
})
export class SnapComponent implements OnInit, OnDestroy {
  public readonly ANIMATION_DURATION_MS = 500;
  public readonly MAX_VISIBLE_CARDS = 8;

  private subs = new Subscription();

  public get playerOne(): Player {
    return this.snap.playerOne;
  }

  public get playerTwo(): Player {
    return this.snap.playerTwo;
  }

  @ViewChild('cards', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  private _animationState: Animation = Animation.Ready;

  public get animationState(): Animation {
    return this._animationState;
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case KeyCode.a:
        this.snap.playerOne.card();
        break;
      case KeyCode.d:
        this.snap.playerOne.snap();
        break;
      case KeyCode.left:
        this.snap.playerTwo.card();
        break;
      case KeyCode.right:
        this.snap.playerTwo.snap();
        break;
    }
  }

  constructor(private snap: Snap) {}

  ngOnInit(): void {
    this.subs.add(
      this.snap.changes.subscribe((state) => {
        switch (state.ref) {
          case StateRef.CARD:
            this._animationState = Animation.Ready;
            this.createCardComponent(state.card);
            break;
          case StateRef.SNAP:
            this.snapped(state);
            break;
          case StateRef.WINNER:
            this.winner(state.player);
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private snapped(state: StateChange): void {
    this._animationState =
      state.player.id === PlayerId.One
        ? Animation.ExitLeft
        : Animation.ExitRight;
    this.snap.block();
    setTimeout(() => {
      this.container.clear();
      this.snap.unblock();
      this._animationState = Animation.Ready;
    }, this.ANIMATION_DURATION_MS);
  }

  private winner(player: Player): void {
    console.warn(`${player.id} wins`);
  }

  private createCardComponent(card: Card): void {
    const cardRef = this.container.createComponent(CardComponent);
    cardRef.instance.card = card;
    const element: HTMLElement = cardRef.location.nativeElement;
    this.rotate(element);
    this.move(element);

    if (this.container.length > this.MAX_VISIBLE_CARDS) {
      this.container.remove(0);
    }
  }

  private rotate(elem: HTMLElement): void {
    const range = 20;
    const offset = range / 2;
    const rotate = Math.random() * range - offset;
    elem.style.rotate = `${rotate}deg`;
  }

  private move(elem: HTMLElement): void {
    elem.style.position = 'absolute';
    const amount = 15;
    const offset = amount / 2;
    elem.style.top = `${Math.random() * amount - offset}px`;
    elem.style.left = `${Math.random() * amount - offset}px`;
  }
}
