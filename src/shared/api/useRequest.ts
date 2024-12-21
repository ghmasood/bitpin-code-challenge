import { useQuery } from '@tanstack/react-query';

export const useRequest = <T>(key: (string | number)[], queryFn: () => Promise<T>) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: key,
    queryFn: () => queryFn(),
  });

  return { data, isLoading, isError, error, isSuccess };
};
