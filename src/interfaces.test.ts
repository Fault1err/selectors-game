import { ILevels } from './interfaces';

describe('ILevels', () => {
  test('ILevels is not null', () => {
    const ILevelsMock: ILevels = {
      levNumCur: 1,
      levName: 'Level 1',
      levAnswer: 'answer',
      levStrobe: 'strobe',
      levBoardMarkup: 'board markup'
    };

    expect(ILevelsMock).not.toBeNull();
  });

  it('ILevels has not null properties', () => {
    const level = {
      levNumCur: 1,
      levName: 'Level 1',
      levAnswer: 'answer',
      levStrobe: 'strobe',
      levBoardMarkup: 'board markup'
    };

    expect(level.levNumCur).not.toBeUndefined();
    expect(level.levName).not.toBeNull();
    expect(level.levAnswer).not.toBeNull();
    expect(level.levStrobe).not.toBeNull();
    expect(level.levBoardMarkup).not.toBeNull();
  });
});
