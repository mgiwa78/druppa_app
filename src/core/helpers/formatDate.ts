export default function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const options: Object = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
}
