import { format } from 'date-fns';
import { Knex } from 'knex';
import { z } from 'zod';

export const slot = z.object({
  time: z.date(),
  providerId: z.number(),
  booked: z.boolean(),
});

export type Slot = z.infer<typeof slot>;

const fmt = 'yyyy-MM-dd HH:mm:SS';

async function getBookedSlots(
  knex: Knex,
  start: Date,
  end: Date,
): Promise<Slot[]> {
  const interval = '3 hour';
  const caseQuery = knex('booking')
    .select('id')
    .whereRaw('booking.provider_id = provider.id')
    .andWhereRaw('during && tsrange(?, ?)', [
      knex.raw("date_trunc('hour', time)"),
      knex.raw("date_trunc('hour', time) + INTERVAL '?'", [knex.raw(interval)]),
    ]);

  const res = await knex
    .select<Slot[]>(
      knex.raw(
        'time, provider.id as "providerId", CASE WHEN EXISTS (?) THEN true ELSE false END AS booked',
        [caseQuery],
      ),
    )
    .from(
      knex.raw(
        "generate_series(?::timestamp, ?::timestamp, INTERVAL '?') AS time",
        [format(start, fmt), format(end, fmt), knex.raw(interval)],
      ),
    )
    .joinRaw('JOIN provider ON true')
    .whereRaw('extract(dow FROM time) > 0') // exclude Sundays
    .whereRaw('extract(dow FROM time) < 6') // exclude Saturdays
    .whereRaw('extract(hour FROM time) >= 8') // exclude before 8am
    .whereRaw('extract(hour FROM time) < 16'); // exclude after 4pm

  return res;
}

export default getBookedSlots;
