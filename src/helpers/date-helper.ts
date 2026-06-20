export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString(undefined, {
    hour12: false
  });
};
