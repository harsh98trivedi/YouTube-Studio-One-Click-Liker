// This function contains the logic that will be executed on the YouTube Studio page.
function likeAllCommentsOnPage() {
  let likedCount = 0;
  // Select all heart icons available on the page.
  document
    .querySelectorAll(".ytcp-comment-creator-heart")
    .forEach((element) => {
      const button = element.querySelector("ytcp-icon-button");

      // Check if the heart icon button exists and is not already liked.
      // The 'aria-label' for a liked comment is "Remove heart".
      if (button && button.getAttribute("aria-label") !== "Remove heart") {
        button.click();
        likedCount++;
      }
    });

  // Log a confirmation message in the browser's developer console.
  if (likedCount > 0) {
    console.log(
      `YouTube Studio One-Click Liker: Successfully liked ${likedCount} new comments.`
    );
  } else {
    console.log("YouTube Studio One-Click Liker: No new comments to like.");
  }
}

// This listener triggers when the user clicks the extension's icon in the toolbar.
chrome.action.onClicked.addListener((tab) => {
  // To prevent errors, ensure the script only runs on the YouTube Studio comments page.
  if (
    tab.url.includes("studio.youtube.com/channel/") &&
    tab.url.includes("/comments")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: likeAllCommentsOnPage,
    });
  } else {
    // If the user is on the wrong page, log a helpful message to the console.
    console.log(
      "YouTube Studio One-Click Liker can only be used on the YouTube Studio comments page."
    );
  }
});
