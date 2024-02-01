export const useQueryString = (
  queryKey: string,
  {
    defaultValue,
    type,
  }: {
    defaultValue: string;
    type: "string" | "array";
  }
) => {
  const getQueryStringValue = () => {
    return (
      new URLSearchParams(window.location.search).get(queryKey) || defaultValue
    );
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
