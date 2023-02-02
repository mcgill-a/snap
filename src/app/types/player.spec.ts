import { Cards } from './cards';
import { Action, Player } from './player';

/*
  Concepts in this file that you need to know:
  - partial: Partial<Cards>
  - type casting: <Cards>cards
  - basic observables - subscribe, unsubscribe
*/

describe('Player', () => {
  let player: Player;
  let cards: Partial<Cards>;

  beforeEach(() => {
    player = new Player('', <Cards>cards);
  });

  it('should get the player id', () => {
    player = new Player('foo', <Cards>cards);
    expect(player.id).toBe('foo');
  });

  it('should get the player cards', () => {
    cards = { count: 20 };
    expect(player.cards.count).toEqual(20);
  });

  it('should trigger Action.Card when playing a card', () => {
    let action: Action | undefined;
    const sub = player.action.subscribe((x) => (action = x));

    player.card();
    sub.unsubscribe();

    expect(action).toEqual(Action.Card);
  });

  it('should trigger Action.Snap when calling snap', () => {
    let action: Action | undefined;
    const sub = player.action.subscribe((x) => (action = x));

    player.snap();
    sub.unsubscribe();

    expect(action).toEqual(Action.Snap);
  });
});
