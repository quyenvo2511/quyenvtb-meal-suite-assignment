const encodeQuery = (data: Record<string, any>): string => {
  const values: string[] = [];

  for (const key in data) {
    const value = data[key];
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((val) =>
        values.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      );
    } else {
      values.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  if (values.length === 0) return "";

  return `?${values.join("&")}`;
};

export { encodeQuery };
