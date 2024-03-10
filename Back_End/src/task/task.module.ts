export const status = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export type Status = (typeof status)[keyof typeof status];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};
