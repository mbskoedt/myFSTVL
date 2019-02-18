"use strict";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

setDefaultPage();

////// TINDER CARDS /////////

//// HVIS MERE /////
function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}


///// KLIK FOR LIKE //////
var vidDislike = document.getElementById("dislike");

function playVidDislike() {
  vidDislike.play();
}

var vidLike = document.getElementById("like");

function playVidLike() {
  vidLike.play();
}


//// Swipe function ////

"use strict";

//make sure that the DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function() {
  fetchArtists();
});

function like(element) {
  $(element).addClass('rotate-left').delay(1000).fadeOut(1000);
  $('.card').find('.status').remove();
  $(element).removeClass('active');
  $(element).append('<div class="status like">Like!</div>');
  if ($(element).is(':last-child')) {
    $('.card:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(1000);
    $('.card:nth-child(1)').addClass('active');
  } else {
    $(element).next().removeClass('rotate-left rotate-right').fadeIn(1000);
    $(element).next().addClass('active');
  }
}

function dislike(element) {
  $(element).addClass('rotate-right').delay(1000).fadeOut(1000);
  $('.card').find('.status').remove();
  $(element).removeClass('active');
  $(element).append('<div class="status dislike">Dislike!</div>');
  if ($(element).is(':last-child')) {
    $('.card:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(1000);
    $('.card:nth-child(1)').addClass('active');
    alert('OUPS');
  } else {
    $(element).next().removeClass('rotate-left rotate-right').fadeIn(1000);
    $(element).next().addClass('active');
  }
}

function likeButtonEvent() {
  like($('.card.active'));
}

function dislikeButtonEvent() {
  dislike($('.card.active'));
}

function addSwipeEffect() {
  $(".card").on("swiperight", function() {
    like(this);
  });

  $(".card").on("swipeleft", function() {
    dislike(this);
  });
}

function fetchArtists() {
  fetch("json/artists.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      appendArtists(json);
    });
}

function appendArtists(artists) {
  let htmlTemplate = "";
  console.log(artists);
  for (let i = 0; i < artists.length; i++) {
    let artist = artists[i];
    if (i === 0) {
      htmlTemplate += `
       <article class="card active" style="display: block;">
               <section id="avatar" style="display: block";>
             <img class="avatar-img" src="${artist.imgurl}">
           <h2>${artist.name}</h2>
           <h3><i>${artist.genre}</i></h3>
           <p>${artist.post}</p>
           </section>
           </article>
           `;
    } else {
      htmlTemplate += `
       <article class="card">
               <section id="avatar" style="display: block";>
             <img class="avatar-img" src="${artist.imgurl}">
           <h2>${artist.name}</h2>
           <h3><i>${artist.genre}</i></h3>
           <p>${artist.post}</p>
           </section>
           </article>
           `;
    }
  }
  document.querySelector('#swipeContainer').innerHTML = htmlTemplate;
  // add swipe effect after content added
  addSwipeEffect();
}
