import { Player } from '../types/player';
import { TableService } from './table';

describe('Table', () => {
  let table: TableService;

  let playerOne: Partial<Player>;
  let playerTwo: Partial<Player>;

  beforeEach(async () => {
    playerOne = {};
    playerTwo = {};
    table = new TableService(<Player>playerOne, <Player>playerTwo);
  });

  it('should create', () => {
    expect(table).toBeTruthy();
  });
});
