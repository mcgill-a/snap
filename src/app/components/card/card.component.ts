import { Component, Input } from '@angular/core';
import { Card } from 'src/app/types/card';

@Component({
  selector: 'fido-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  public card?: Card;

  public get href(): string | undefined {
    return this.card
      ? `assets/cards/${this.card.value}_of_${this.card.suit}.svg`
      : void 0;
  }
}
