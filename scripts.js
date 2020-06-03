// var settings = {
//   "url": "https://graph.facebook.com/search?type=adinterest&q=[Beach]&limit=10&locale=en_US&access_token=677916593037704|gvX9a7sygGJ3nMNvSvr5WalhCCM",
//   "method": "GET",
//   "timeout": 0,
// };
var baseUrl = new URL('https://graph.facebook.com/search?limit=500&access_token=677916593037704|gvX9a7sygGJ3nMNvSvr5WalhCCM');
var params = baseUrl.searchParams;

const resultsContainer = document.getElementById("results");
const aud = document.getElementById("aud");
// resultsContainer.setAttribute("class", "results-container");
// main.appendChild(resultsContainer);

//puts commas in audience size number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function getKeyword() {
  var keyword = document.getElementById("key-input").value;
  return keyword;
}

function getSearchType() {
  var type;
  var typeInput = document.getElementById("search-type").value;
  if (typeInput === "Ad Interest") {
    type = "adinterest";
  } else {
    type = "adinterestsuggestion";
  }
  return type;
}

function getLocale(){
  var locale;
  var localeInput = document.getElementById("locale").value;
  if (localeInput === "English") {
    locale = "en_US";
  } else if (localeInput === "German") {
    locale = "de_DE";
  } else {
    locale = "es_ES";
  }
  return locale;
}

function setParams(){
  var keyword = getKeyword();
  var type = getSearchType();
  var locale = getLocale();

  if (type === "adinterestsuggestion") {
    params.set('interest_list', `["${keyword}"]`);
  } else {
    params.set('q', keyword);
  }
  // params.append('q', `[${keyword}]`);
  params.set('locale', locale);
  params.set('type', type);
  baseUrl.search = params.toString();
  var newUrl = baseUrl.toString();
  console.log(newUrl);
  return newUrl;
}

function callApi(){
  $.ajax(setParams()).done(function (response) {
    // console.log(response);
    response.data.forEach(result => {
      const itemCard = document.createElement("div");
      itemCard.setAttribute("class", "item-card");

      const interest = document.createElement("p");
      const audience = document.createElement("p");
      const size = formatNumber(result.audience_size)

      interest.setAttribute("class", "interest")
      audience.setAttribute("class", "audience-size")

      interest.textContent = result.name;
      audience.textContent = size;
      resultsContainer.appendChild(itemCard);
      itemCard.appendChild(interest);
      itemCard.appendChild(audience);
    });
  });
}

function clearContent() {
  document.getElementById("results").innerHTML = "";
  // console.log("clear");
}

function resetAndCall(){
  clearContent()
  callApi()
}

function check(){
  console.log("Hi");
}

// function showData(result) {
//     // const card = document.createElement("div");
//     // card.setAttribute("class", "card");
//     const interest = document.createElement("p");
//     const audience = document.createElement("p");
//     const size = formatNumber(result.audience_size)
//     interest.textContent = result.name;
//     audience.textContent = `Audience size: ${size}`;
//     // card.appendChild(interest);
//     // card.appendChild(audience);
//     $("#results").append(interest);
//     $("#results").append(audience);
// }
// ^^better to have this here or inside the api call? like above

// calls API
// function callApi(){
//   $.ajax(setParams()).done(function (response) {
//     console.log(response);
//     response.data.forEach(showData);
//   });
// }
