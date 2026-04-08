import { apiClient } from '@/lib/api/client';
import { mockFetchCourses } from '@/lib/api/demo/mockCourses';
import { DEMO_MODE } from '@/lib/env';
import type { CoursesApiEnvelope } from '@/lib/api/types';

export interface CoursesQueryParams {
  sessionId: number;
  semester: number;
  page: number;
  limit: number;
}

export async function fetchCourses(params: CoursesQueryParams) {
  if (DEMO_MODE) {
    return mockFetchCourses(params);
  }

  const { data } = await apiClient.get<CoursesApiEnvelope>('/courses', {
    params: {
      sessionId: params.sessionId,
      semester: params.semester,
      page: params.page,
      limit: params.limit,
    },
  });
  return data.data;
}
