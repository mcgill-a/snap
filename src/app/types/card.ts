import { shuffle } from 'lodash';

type Suit = 'spades' | 'clubs' | 'hearts' | 'diamonds';
type Value =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 'jack'
  | 'queen'
  | 'king'
  | 'ace';

export interface Card {
  suit: Suit;
  value: Value;
}

export function DeckOfCards(): Card[] {
  return shuffle([
    ...suit('spades'),
    ...suit('clubs'),
    ...suit('hearts'),
    ...suit('diamonds'),
  ]);
}

function suit(suit: Suit): Card[] {
  return [
    { suit, value: 2 },
    { suit, value: 3 },
    { suit, value: 4 },
    { suit, value: 5 },
    { suit, value: 6 },
    { suit, value: 7 },
    { suit, value: 8 },
    { suit, value: 9 },
    { suit, value: 10 },
    { suit, value: 'jack' },
    { suit, value: 'queen' },
    { suit, value: 'king' },
    { suit, value: 'ace' },
  ];
}
