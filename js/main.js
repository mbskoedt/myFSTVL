"use strict";

// login side
    function saveLocalStorage() {
  let email = document.querySelector("#email").value;
  console.log(email);

  // gem data lokalt under email
  localStorage.setItem("email", email);
  // call loadFromStorage to update displayed values

}
    function loadFromStorage() {
  // hent data fra lokal
  let localStorageEmail = localStorage.getItem("email");
  console.log("localStorageEmail", localStorageEmail);
  
  
  // sæt værdi i indput felt til værdi i lokal
  document.querySelector('#email').value = localStorageEmail;
  document.querySelector('#email2').value = localStorageEmail;
}

loadFromStorage();



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
  let page = "login";
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
      appendArtists(json.artists);
    });
}

function appendArtists(artists) {
  let htmlTemplate = "";
  for (let i = 0; i < artists.length; i++) {
    let artist = artists[i];
    if (i === 0) {
      htmlTemplate += `
       <article class="card active" style="display: block;">
               <section id="avatar" style="display: block";>
             <img class="avatar-img" src="${artist.imgurl}">
           <h2>${artist.name}</h2>
           <h3><i>${artist.genre}</i></h3>
           <iframe src="${artist.spotify}" width="300" height="80" frameborder="5px" allowtransparency="true" allow="encrypted-media"></iframe>
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
            <iframe src="${artist.spotify}" width="300" height="80" frameborder="5px" allowtransparency="true" allow="encrypted-media"></iframe>
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

function printLikedArtists() {
  { // caution: drop the "new Array" part or it won't work!
    let likedArtists = document.getElementsByClassName("rotate-left");
    console.log(likedArtists);
    let printThis = "";
    for (let i = 0; i < likedArtists.length; i++) {
      printThis += likedArtists[i];
    }
    return printThis; // <-- to be printed to the div
  }
  document.getElementById('likeGridContainer').innerHTML = showLikedArtists();
}
