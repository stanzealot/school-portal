import type { CoursesQueryParams } from '@/lib/api/courses';

export const queryKeys = {
  courses: {
    all: ['courses'] as const,
    list: (params: Pick<CoursesQueryParams, 'sessionId' | 'semester' | 'page' | 'limit'>) =>
      ['courses', 'list', params] as const,
  },
} as const;
