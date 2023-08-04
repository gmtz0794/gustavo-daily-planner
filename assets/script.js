// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    function handleSaveButtonClick(event) {
        var saveButton = event.target;
        var timeBlocks = saveButton.closest('.time-block');
        var blockHour = timeBlocks.id.split('-')[1];
        var userInput = timeBlocks.querySelector('.description').value;
        localStorage.setItem('Hour_' + blockHour, userInput);

    }

    var saveButtons = document.querySelectorAll('.saveBtn');
    saveButtons.forEach(function(saveButton) {
        saveButton.addEventListener('click', handleSaveButtonClick);
    });

    function displaySavedData() {
        var timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(function(timeBlock) {
            var blockHour = timeBlock.id.split('-')[1];
            var savedUserInput = localStorage.getItem('Hour_' + blockHour);
            timeBlock.querySelector('.description').value = savedUserInput;
        });
    }

    displaySavedData();

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?

    var currentHour = parseInt(dayjs().format('H'));
    var timeBlocks = $('.time-block');
    timeBlocks.each(function() {
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
        if (blockHour < currentHour) {
            $(this).addClass('past').removeClass('present future');
        } else if (blockHour === currentHour) {
            $(this).addClass('present').removeClass('past future');
        } else {
            $(this).addClass('future').removeClass('past present');
        }
    }
    )

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    $(document).ready(function(){
        var interval = setInterval(function(){
            var momentNow = moment();
            $('#currentDay').html(momentNow.format('dddd').substring(0,3).toUpperCase()+', '+ momentNow.format('DD MMMM YYYY'));
        });
    });
  });
  