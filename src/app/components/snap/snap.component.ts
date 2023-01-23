import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Snap, Status, KeyCode } from 'src/app/games/snap';
import { Player } from 'src/app/types';
import { Card } from 'src/app/types/card';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'fido-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss'],
})
export class SnapComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  private _status?: Status;

  public get playerOne(): Player {
    return this.game.playerOne;
  }

  public get playerTwo(): Player {
    return this.game.playerTwo;
  }

  public get status(): Status | undefined {
    return this._status;
  }

  @ViewChild('cards', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  @HostListener('window:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case KeyCode.a:
        this.game.next(this.game.playerOne);
        break;
      case KeyCode.d:
        this.game.snap(this.game.playerOne);
        break;
      case KeyCode.left:
        this.game.next(this.game.playerTwo);
        break;
      case KeyCode.right:
        this.game.snap(this.game.playerTwo);
        break;
    }
  }

  constructor(private game: Snap) {}

  ngOnInit(): void {
    this.game.start();

    this.subs.add(
      this.game.state.subscribe((state) => {
        this._status = state.status;
        if (state.card) {
          this.createCardComponent(state.card);
        } else {
          if (state.status !== 'Done') {
            this.clear();
          }
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

  private createCardComponent(card: Card): void {
    const cardRef = this.container.createComponent(CardComponent);
    cardRef.instance.card = card;
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
