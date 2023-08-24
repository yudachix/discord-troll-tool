import { dayjs } from '@/libs/dayjs';

export const toCreatedAtString = (createdAt: Date): string => (
  dayjs(createdAt).tz().format('YYYY-MM-DDThh:mm:ss.SSSZ')
);
