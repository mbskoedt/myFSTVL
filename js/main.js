"use strict";

let artists = [];

// login side

function saveLocalStorage() {
  let email = document.querySelector("#email").value;
  let password = document.querySelector('#password').value;
  console.log(email);

  // gem data lokalt under email
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  // call loadFromStorage to update displayed values

}


function loadFromStorage() {
  // hent data fra lokal
  let localStorageEmail = localStorage.getItem("email");
  console.log("localStorageEmail", localStorageEmail);

  let localStoragePassword = localStorage.getItem("password");
  console.log("localStoragePassword", localStoragePassword);

  // sæt værdi i indput felt til værdi i lokal
  document.querySelector('#email').value = localStorageEmail;
  document.querySelector('#email2').value = localStorageEmail;
  document.querySelector('#password').value = localStoragePassword;
  document.querySelector('#password2').value = localStoragePassword;

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
  if (pageId == "home") {
    appendArtists(artists);
  }
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
      artists = json.artists;
      appendArtists(json.artists);
    });
}

<<<<<<< HEAD
/////// SKRIV ARTISTER m. addblue TIL DOM'en ///////

=======
>>>>>>> bdb3691360f37393b23c12ca13f95b6c2cfc4a7e
function appendArtists(artists) {
  let buttons = document.querySelectorAll(".button.addblue");
  let filteredArtists = [];
  for (let button of buttons) {
    console.log(button.innerText);
    let genre = button.innerText;
    for (let artist of artists) {
      artist.genre.includes(genre);
      if (artist.genre.includes(genre)) {
        filteredArtists.push(artist);
      }
    }
  }
  console.log(filteredArtists);
  let artistsToShow = [];
  if (filteredArtists.length > 0) {
    artistsToShow = filteredArtists;
  } else {
    artistsToShow = artists;
  }
  let htmlTemplate = "";
  for (let i = 0; i < artistsToShow.length; i++) {
    let artist = artistsToShow[i];
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
  // caution: drop the "new Array" part or it won't work!
  let likedArtists = document.querySelectorAll(".rotate-left");
  console.log(likedArtists);
  let printThis = "";
  for (let i = 0; i < likedArtists.length; i++) {
    let artist = likedArtists[i];
    artist.classList.remove("rotate-left");
    artist.style.display = "block";
    document.getElementById('likeGridContainer').appendChild(artist);
  }
  console.log(printThis);
}

function printDislikedArtists() {
  // caution: drop the "new Array" part or it won't work!
  let dislikedArtists = document.querySelectorAll(".rotate-right");
  console.log(dislikedArtists);
  let printThis = "";
  for (let i = 0; i < dislikedArtists.length; i++) {
    let disartist = dislikedArtists[i];
    disartist.classList.remove("rotate-right");
    disartist.style.display = "block";
    document.getElementById('dislikeGridContainer').appendChild(disartist);
  }
  console.log(printThis);
}

<<<<<<< HEAD

///// addblue TIL VALGTE GENRE //////

=======
>>>>>>> bdb3691360f37393b23c12ca13f95b6c2cfc4a7e
let buttons = document.querySelectorAll(".button");
console.log(buttons);

for (let button of buttons) {
  button.addEventListener("click", function(elem) {
    console.log(elem);
    console.log(elem.target.innerText);
    console.log(elem.target.classList.contains('addblue'));
    if (elem.target.classList.contains('addblue')) {
      elem.target.classList.remove('addblue');
    } else {
      elem.target.classList.add('addblue');
    }
  });
}
