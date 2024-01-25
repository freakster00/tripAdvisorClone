document.addEventListener('DOMContentLoaded', function () {
    function updateBigTextContent(content) {
      document.querySelector('.bigtextcontent').innerHTML = content;
    }

    function updateSearchPlaceholder(placeholderText) {
      document.getElementById('search-bar').placeholder = placeholderText;
    }

    function handleSectionClick(sectionId, content, placeholderText) {
      document.querySelectorAll('.contentsearch').forEach(function (element) {
        element.classList.remove('selected');
      });

      document.getElementById(sectionId).classList.add('selected');

      updateBigTextContent(content);
      updateSearchPlaceholder(placeholderText);
    }

    document.getElementById('searchall').addEventListener('click', function () {
      handleSectionClick('searchall', 'Where to?', 'Places to go, things to do');
    });

    document.getElementById('hotel').addEventListener('click', function () {
      handleSectionClick('hotel', 'Stay somewhere awesome', 'Hotel name and destination');
    });

    document.getElementById('commute').addEventListener('click', function () {
      handleSectionClick('commute', 'Travel cosy', 'Vehicles arrival and fair price');
    });

    document.getElementById('itinery').addEventListener('click', function () {
      handleSectionClick('itinery', 'A day all planned, just enjoy', 'Your trip planner interface');
    });

    document.getElementById('flight').addEventListener('click', function () {
      handleSectionClick('flight', 'Fly all high, book anytime', 'Flight time and price');
    });

    document.getElementById('guide').addEventListener('click', function () {
      handleSectionClick('guide', 'Hire a guide on your hand', 'Guide name, experience and reviews');
    });

    // Initial content and placeholder
    updateBigTextContent('Where to?');
    updateSearchPlaceholder('Places to go, things to do');
  });




  const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  eventDetails = document.getElementById("eventDetails"),
  sideBox = document.getElementById("sideBox");

const nepaliEventsApiUrl = "https://nepali-events-api.vercel.app/api/events";
const volunteeringActivitiesApiUrl = "https://www.boredapi.com/api/activity?type=volunteer";

// Function to fetch data from an API
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};



// Function to update the side box content
const updateSideBox = async (date) => {
  const nepaliEventData = eventData[date];

  if (nepaliEventData) {
    // Fetch volunteering activity
    const volunteeringActivityData = await fetchData(volunteeringActivitiesApiUrl);

    eventDetails.innerHTML = `
      <p><strong>Nepali Date:</strong> ${nepaliEventData.nepaliDate}</p>
      <p><strong>Volunteering Activity:</strong> ${volunteeringActivityData.activity}</p>
    `;
    sideBox.style.display = "block";
  } else {
    sideBox.style.display = "none";
  }
};








// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"];

const renderCalendar = () => {
let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
let liTag = "";

for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
}

for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                 && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
}

for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
}
currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
icon.addEventListener("click", () => { // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear(); // updating current year with new date year
        currMonth = date.getMonth(); // updating current month with new date month
    } else {
        date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
});
});



// Modify the loop inside renderCalendar to include event handling
for (let i = 1; i <= lastDateofMonth; i++) {
  let isToday = i === date.getDate() && currMonth === new Date().getMonth()
    && currYear === new Date().getFullYear() ? "active" : "";

  // Check if there are events for this day
  const eventText = events[`${currYear}-${currMonth + 1}-${i < 10 ? '0' : ''}${i}`];
  const eventClass = eventText ? "has-event" : "";

  liTag += `<li class="${isToday} ${eventClass}" onclick="updateSideBox('${currYear}-${currMonth + 1}-${i < 10 ? '0' : ''}${i}')">${i}`;

  if (eventText) {
    liTag += `<div class="event-tooltip">${eventText.join('<br>')}</div>`;
  }

  liTag += `</li>`;
}

// Add a function to show events for a specific day
const showEvents = (day) => {
  const eventDate = new Date(currYear, currMonth, day);
  const dateString = eventDate.toISOString().split('T')[0];

  const dayEvents = events[dateString];
  if (dayEvents && dayEvents.length > 0) {
    alert(`Events for ${months[currMonth]} ${day}, ${currYear}:\n${dayEvents.join('\n')}`);
  } else {
    alert(`No events for ${months[currMonth]} ${day}, ${currYear}.`);
  }
};


// document.getElementById("hotel").onclick = function() {myFunction()};

// function myFunction() {
//   // document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
//   alert("Working")
// }
