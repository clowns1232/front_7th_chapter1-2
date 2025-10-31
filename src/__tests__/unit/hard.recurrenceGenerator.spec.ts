import { generateRecurringDates } from '../../domain/recurrence/generateRecurringDates';

describe('generateRecurringDates', () => {
  it('supports selecting all repeat types when creating recurring schedules', () => {
    const daily = generateRecurringDates({
      startDate: '2025-01-01',
      repeat: { type: 'daily', interval: 1 },
      endDate: '2025-01-03',
    });
    const weekly = generateRecurringDates({
      startDate: '2025-01-01',
      repeat: { type: 'weekly', interval: 2 },
      endDate: '2025-01-29',
    });

    expect(daily).toEqual(['2025-01-01', '2025-01-02', '2025-01-03']);
    expect(weekly).toEqual(['2025-01-01', '2025-01-15', '2025-01-29']);
  });

  it('creates only occurrences that fall on the 31st for monthly repeats starting on the 31st', () => {
    const occurrences = generateRecurringDates({
      startDate: '2025-01-31',
      repeat: { type: 'monthly', interval: 1 },
      endDate: '2025-06-30',
    });

    expect(occurrences).toEqual(['2025-01-31', '2025-03-31', '2025-05-31']);
  });

  it('creates only leap-day occurrences when repeating yearly from February 29th', () => {
    const occurrences = generateRecurringDates({
      startDate: '2024-02-29',
      repeat: { type: 'yearly', interval: 1 },
      endDate: '2032-12-31',
    });

    expect(occurrences).toEqual(['2024-02-29', '2028-02-29', '2032-02-29']);
  });
});
