import { Timestamp } from "firebase/firestore";

export function getTimeDifference(
  timestamp: Date | Timestamp | null | undefined
) {
  if (!timestamp) {
    return "Invalid date";
  }

  const currentDate = new Date();
  const timestampDate =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - timestampDate.getTime()) / 1000
  );

  switch (true) {
    case differenceInSeconds < 60:
      return `${differenceInSeconds} seconds ago`;
    case differenceInSeconds < 3600:
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    case differenceInSeconds < 86400:
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    default:
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}
