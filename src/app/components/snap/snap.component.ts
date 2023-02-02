import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Snap, StateRef } from 'src/app/games/snap';
import { Player, PlayerId } from 'src/app/types';
import { Card } from 'src/app/types/card';
import { CardComponent } from '../card/card.component';

export enum KeyCode {
  a = 'KeyA',
  d = 'KeyD',
  left = 'ArrowLeft',
  right = 'ArrowRight',
}

@Component({
  selector: 'fido-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss'],
})
export class SnapComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  public get playerOne(): Player {
    return this.snap.playerOne;
  }

  public get playerTwo(): Player {
    return this.snap.playerTwo;
  }

  @ViewChild('cards', { read: ViewContainerRef })
  private container!: ViewContainerRef;

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
      this.snap.change.subscribe((state) => {
        switch (state.ref) {
          case StateRef.CARD:
            this.createCardComponent(state.card, state.player);
            break;
          case StateRef.SNAP:
            this.clear();
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

  private clear(): void {
    this.container?.clear();
  }

  private winner(player: Player): void {
    console.warn(`${player.id} wins`);
  }

  private createCardComponent(card: Card, player: Player): void {
    const cardRef = this.container.createComponent(CardComponent);
    cardRef.instance.card = card;
    cardRef.instance.enterLeft = player.id === PlayerId.One;
    cardRef.instance.enterRight = player.id === PlayerId.Two;
    const element: HTMLElement = cardRef.location.nativeElement;
    this.rotate(element);
    this.move(element);
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
