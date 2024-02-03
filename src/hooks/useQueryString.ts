export const useQueryString = (queryKey: string) => {
  const getQueryStringValue = () => {
    return new URLSearchParams(window.location.search).get(queryKey);
  };

  const setQueryStringValue = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(queryKey, value);
    const newRelativePathQuery = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    window.history.pushState(null, "", newRelativePathQuery);
  };

  return {
    value: getQueryStringValue(),
    set: setQueryStringValue,
  };
};
