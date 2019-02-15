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
$(document).ready(function() {

  $(".buddy").on("swiperight", function() {
    $(this).addClass('rotate-left').delay(500).fadeOut(2);
    $('.buddy').find('.status').remove();

    $(this).append('<div class="status like">Like!</div>');
    if ($(this).is(':last-child')) {
      $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    } else {
      $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    }
  });

  $(".buddy").on("swipeleft", function() {
    $(this).addClass('rotate-right').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(this).append('<div class="status dislike">Dislike!</div>');

    if ($(this).is(':last-child')) {
      $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
      alert('OUPS');
    } else {
      $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    }
  });
});



$('#dislike').on('click', function(event) {
  console.log('dislike')
  $(".buddy").addClass('rotate-left').delay(500).fadeOut(2);
  $('.buddy').find('.status').remove();

  $(".buddy").append('<div class="status like">Like!</div>');
  if ($(".buddy").is(':last-child')) {
    $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
  } else {
    $(".buddy").next().removeClass('rotate-left rotate-right').fadeIn(400);
  }
});
$('#like').on('click', function(event) {
  $(this).addClass('rotate-right').delay(700).fadeOut(1);
  $('.buddy').find('.status').remove();
  $(this).append('<div class="status dislike">Dislike!</div>');

  if ($(this).is(':last-child')) {
    $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    alert('OUPS');
  } else {
    $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
  }
});





fetch('json/artists.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendArtists(json);
  });

function appendArtists(artists) {
  for (let artist of artists) {
    console.log(artist);
    avatar.innerHTML += `
    <iframe class="avatar-video" src="${artist.videourl}"></iframe>
  </div>
  <h2>${artist.name}</h2>
  <h3><i>${artist.genre}</i></h3>
  <p>${artist.post}</p>
    `;
  }
}
