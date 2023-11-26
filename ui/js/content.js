const backgroundFetchTranscripts = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");
  if (videoId) {
    chrome.runtime.sendMessage(
      { type: "fetchTranscripts", videoId },
      function (response) {
        if (response.fetch === "success") {
          console.log("Transcripts fetched successfully.");
        } else {
          console.log("Failed to fetch transcripts.");
        }
      }
    );
  }
};

function setYouTubeVideoTime(milliseconds) {
  var videoPlayer = document.querySelector("video");

  if (videoPlayer) {
    // Convert milliseconds to seconds and set the current time
    videoPlayer.currentTime = milliseconds / 1000;
  } else {
    console.error("YouTube video player not found");
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "checkURL") {
    backgroundFetchTranscripts();
  }
  sendResponse({ status: "completed" });
});

backgroundFetchTranscripts();
