import { Component, Input } from '@angular/core';
import {
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
} from 'angular-animations';
import { Card } from 'src/app/types/card';

@Component({
  selector: 'fido-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'enterLeft', duration: 750 }),
    bounceInRightOnEnterAnimation({ anchor: 'enterRight', duration: 750 }),
  ],
})
export class CardComponent {
  @Input()
  public card?: Card;

  @Input()
  public enterLeft = false;

  @Input()
  public enterRight = false;

  public get href(): string | undefined {
    return this.card
      ? `assets/cards/${this.card.value}_of_${this.card.suit}.svg`
      : void 0;
  }
}
