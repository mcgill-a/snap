import { Card } from './card';
import { Cards } from './cards';

describe('Cards', () => {
  let cards: Cards;

  beforeEach(() => {
    cards = new Cards();
  });

  it('should add to the cards', () => {
    const toAdd = <Card[]>[
      { suit: 'clubs', value: 2 },
      { suit: 'diamonds', value: 'king' },
    ];
    cards.add(toAdd);
    expect(cards.count).toBe(2);
  });
});
