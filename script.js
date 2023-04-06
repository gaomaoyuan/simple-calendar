$(document).ready(function() {
  // Set the current day at the top of the page using Day.js
  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);

  // Set the initial state of the time blocks based on the current time
  updateTimeBlocks();

  // Add a click event listener to the save buttons
  $(".saveBtn").on("click", function() {
    // Get the text from the description textarea for this time block
    var descriptionText = $(this)
      .siblings(".description")
      .val();

    // Get the id of this time block (e.g. "hour-9")
    var timeBlockId = $(this)
      .parent()
      .attr("id");

    // Save the description text to local storage using the time block id as the key
    localStorage.setItem(timeBlockId, descriptionText);
  });

  // Load the saved description texts from local storage and set them in the appropriate time blocks
  loadSavedDescriptions();

  // Update the color of each time block every 15 minutes to reflect the current time
  setInterval(updateTimeBlocks, 15 * 60 * 1000);
});

// Function to update the color of each time block based on the current time
function updateTimeBlocks() {
  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Loop through each time block and update its color based on its id
  $(".time-block").each(function() {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      // Past hour
      $(this).addClass("past");
      $(this).removeClass("present future");
    } else if (timeBlockHour === currentHour) {
      // Current hour
      $(this).addClass("present");
      $(this).removeClass("past future");
    } else {
      // Future hour
      $(this).addClass("future");
      $(this).removeClass("past present");
    }
  });
}

// Function to load the saved description texts from local storage and set them in the appropriate time blocks
function loadSavedDescriptions() {
  // Loop through each time block and get its id
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");

    // Get the saved description text for this time block from local storage using the time block id as the key
    var descriptionText = localStorage.getItem(timeBlockId);

    // If there is saved text, set it in the description textarea for this time block
    if (descriptionText !== null) {
      $(this)
        .children(".description")
        .val(descriptionText);
    }
  });
}
