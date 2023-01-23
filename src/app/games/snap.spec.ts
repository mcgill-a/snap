import { Snap } from './snap';

describe('Snap', () => {
  let snap: Snap;

  beforeEach(async () => {
    snap = new Snap();
  });

  it('should create', () => {
    expect(snap).toBeTruthy();
  });
});
