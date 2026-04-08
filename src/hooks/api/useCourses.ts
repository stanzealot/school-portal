import { useQuery } from '@tanstack/react-query';
import { fetchCourses, type CoursesQueryParams } from '@/lib/api/courses';
import { queryKeys } from '@/lib/query-keys';

export function useCourses(params: CoursesQueryParams | null) {
  return useQuery({
    queryKey: params ? queryKeys.courses.list(params) : ['courses', 'disabled'],
    queryFn: () => fetchCourses(params!),
    enabled: params !== null,
  });
}
