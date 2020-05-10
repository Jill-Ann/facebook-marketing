// var settings = {
//   "url": "https://graph.facebook.com/search?type=adinterest&q=[Beach]&limit=10&locale=en_US&access_token=677916593037704|gvX9a7sygGJ3nMNvSvr5WalhCCM",
//   "method": "GET",
//   "timeout": 0,
// };
var baseUrl = new URL('https://graph.facebook.com/search?type=adinterest&limit=1000&access_token=677916593037704|gvX9a7sygGJ3nMNvSvr5WalhCCM');
var params = baseUrl.searchParams;

const resultsContainer = document.getElementById("root");
const aud = document.getElementById("aud");
// resultsContainer.setAttribute("class", "results-container");
// main.appendChild(resultsContainer);

//puts commas in audience size number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getKeyword() {
  var keyword = document.getElementById("key").value;
  return keyword;
}

function getLocale(){
  var locale = document.getElementById("locale").value;
  return locale;
}

function setParams(){
  var keyword = getKeyword();
  var locale = getLocale();
  params.append('q', keyword);
  // params.append('q', `[${keyword}]`);
  params.append('locale', locale);
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
//     $("#root").append(interest);
//     $("#root").append(audience);
// }
// ^^better to have this here or inside the api call? like above

// calls API
// function callApi(){
//   $.ajax(setParams()).done(function (response) {
//     console.log(response);
//     response.data.forEach(showData);
//   });
// }
