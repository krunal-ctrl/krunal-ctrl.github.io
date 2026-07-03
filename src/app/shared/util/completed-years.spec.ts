import { completedYears } from './completed-years';

describe('completedYears', () => {
  beforeEach(() => jasmine.clock().install());
  afterEach(() => jasmine.clock().uninstall());

  function mockNow(iso: string): void {
    jasmine.clock().mockDate(new Date(iso));
  }

  it('counts a full elapsed year', () => {
    mockNow('2023-09-01');
    expect(completedYears('2021-09-01')).toBe(2);
  });

  it('does not count the current year until the anniversary month arrives', () => {
    mockNow('2023-08-31');
    expect(completedYears('2021-09-01')).toBe(1);
  });

  it('does not count the year until the anniversary day within the month arrives', () => {
    mockNow('2023-09-01');
    expect(completedYears('2021-09-02')).toBe(1);
  });

  it('counts the year exactly on the anniversary day', () => {
    mockNow('2023-09-02');
    expect(completedYears('2021-09-02')).toBe(2);
  });

  it('handles a leap-day start date correctly the following year', () => {
    mockNow('2025-02-28');
    expect(completedYears('2024-02-29')).toBe(0);
    mockNow('2025-03-01');
    expect(completedYears('2024-02-29')).toBe(1);
  });

  it('never returns a negative value for a future start date', () => {
    mockNow('2021-01-01');
    expect(completedYears('2021-09-01')).toBe(0);
  });
});
