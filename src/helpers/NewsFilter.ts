import { NewsFilter } from "../types/news";

export function applyNewsFilter({
  selectedOption,
  selectedInterest,
  newsData,
  setDataToUse,
  toggleBottomSheet,
  toggleOverlay,
}: NewsFilter) {
  let filteredNews;
  switch (selectedOption) {
    case "VerfiedOnly":
      selectedInterest === "All"
        ? (filteredNews = newsData.filter((news) => news.isVerified === true))
        : (filteredNews = newsData.filter(
            (news) =>
              news.isVerified === true &&
              news.category
                .toLowerCase()
                .includes(selectedInterest.toLowerCase())
          ));
      break;
    case "VerfiedAndUnverified":
      selectedInterest === "All"
        ? (filteredNews = newsData)
        : (filteredNews = newsData.filter((news) =>
            news.category.toLowerCase().includes(selectedInterest.toLowerCase())
          ));
      break;
    case "UnVerfiedOnly":
      selectedInterest === "All"
        ? (filteredNews = newsData.filter((news) => news.isVerified === false))
        : (filteredNews = newsData.filter(
            (news) =>
              news.isVerified === true &&
              news.category
                .toLowerCase()
                .includes(selectedInterest.toLowerCase())
          ));

      break;
    default:
      filteredNews = newsData;
  }
  setDataToUse(filteredNews);
  toggleBottomSheet();
  toggleOverlay();
}
