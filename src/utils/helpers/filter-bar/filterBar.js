export const serializeToQueryParams = (obj) => {
  const params = Object.entries(obj)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map(
            (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
          )
        : [`${encodeURIComponent(key)}=${encodeURIComponent(value)}`]
    );

  return params.length ? `?${params.join("&")}` : "";
};

