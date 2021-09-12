
$(document).ready(function() {
  var $currentDay = $("#currentDay");
  var notes = getNotes();
  var interval = setInterval(setTime, 1000);


  updateBackground();
  renderNotes();

// Date and displays in header
function setTime() {
  var date = moment().format("dddd, MMMM Do YYYY");
  $currentDay.innerHTML = date;
  $("#currentDay").text(date);
}
  // saved in local storage

  $(".saveBtn").on("click", function(e) {
    e.preventDefault();
    var val = $(this)
      .siblings(".description")
      .val();
    var hour = $(this)
      .siblings(".description")
      .attr("id");
    notes[hour] = val;

    localStorage.setItem("notes", JSON.stringify(notes));
  });

  $(".clear").on("click", function(e) {
    e.preventDefault();
    $(".description").val(" ");
    var notes = {}
    localStorage.setItem("notes", JSON.stringify(notes));
  });

// retrieving from local storage and converting any note from string to object
  function getNotes() {
    var notes = localStorage.getItem("notes");
    if (notes) {
      notes = JSON.parse(notes);
    } else {
      notes = {};
    }
    return notes;
  }

  // looping 
  function renderNotes() {
    for (var key in notes) {
      $("#" + key).val(notes[key]);
    }
  }

  //  past, present or future
  function updateBackground() {
    var currentHour = moment().hour();
    

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).children(".description").attr("id"));
      $(this)
      // remove classes
      .removeClass("present")
      .removeClass("past")
      .removeClass("future");
     
      if (blockHour === currentHour) {
        $(this).addClass("present");
      };
      if (blockHour < currentHour){
        $(this).addClass("past");
      };
      if (blockHour > currentHour){
        $(this).addClass("future");
      };
    });
  }
});
