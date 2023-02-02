import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import {
  CallSnap,
  Snap,
  StateChange,
  StateRef,
  Winner,
} from 'src/app/games/snap';
import { Player } from 'src/app/types/player';
import { KeyCode, SnapComponent } from './snap.component';

describe('SnapComponent', () => {
  let component: SnapComponent;
  let fixture: ComponentFixture<SnapComponent>;
  let snap: Partial<Snap>;
  let playerOne: Partial<Player>;
  let playerTwo: Partial<Player>;
  let container: ViewContainerRef;
  let changeSubject: Subject<StateChange>;

  beforeEach(async () => {
    playerOne = { snap: jest.fn(), card: jest.fn() };
    playerOne = { snap: jest.fn(), card: jest.fn() };
    changeSubject = new Subject();
    snap = {
      playerOne: <Player>playerOne,
      playerTwo: <Player>playerTwo,
      change: changeSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [SnapComponent],
      providers: [{ Snap, snap }],
    }).compileComponents();

    fixture = TestBed.createComponent(SnapComponent);
    component = fixture.componentInstance;
    container = component['container'];
    fixture.detectChanges();
  });

  it('should map action "A" to player one card', () => {
    const event = <KeyboardEvent>{ code: KeyCode.a };
    component.onKeyUp(event);
    expect(playerOne.card).toHaveBeenCalled();
  });

  it('should map action "D" to player one snap', () => {
    const event = <KeyboardEvent>{ code: KeyCode.a };
    component.onKeyUp(event);
    expect(playerOne.card).toHaveBeenCalled();
  });

  it('should map action "ArrowLeft" to player two card', () => {
    const event = <KeyboardEvent>{ code: KeyCode.a };
    component.onKeyUp(event);
    expect(playerTwo.card).toHaveBeenCalled();
  });

  it('should map action "ArrowRight" to player two snap', () => {
    const event = <KeyboardEvent>{ code: KeyCode.a };
    component.onKeyUp(event);
    expect(playerTwo.card).toHaveBeenCalled();
  });

  it('should clear the container on the CallSnap state change', () => {
    jest.spyOn(container, 'clear');
    changeSubject.next(<CallSnap>{ ref: StateRef.SNAP });
    expect(container.clear).toHaveBeenCalled();
  });

  it('should broadcast the winning player', () => {
    jest.spyOn(console, 'warn').mockImplementationOnce(() => null);
    const x = player('foo');

    changeSubject.next(<Winner>{ ref: StateRef.WINNER, player: x });

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(x.id));
  });

  function player(id: string): Player {
    return <Player>{
      get id() {
        return id;
      },
    };
  }
});
