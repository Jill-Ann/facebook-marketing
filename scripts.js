let baseUrl = new URL('https://graph.facebook.com/search?limit=500&access_token=677916593037704|gvX9a7sygGJ3nMNvSvr5WalhCCM');
// get access to URLSearchParams object
let params = baseUrl.searchParams;

const resultsContainer = document.getElementById("results");

const getKeyword = () => {
  let keyword = document.getElementById("key-input").value;
  let keywordUpCase = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  // console.log(keywordUpCase);
  return keywordUpCase;
}

const getSearchType = () => {
  let type;
  let typeInput = document.getElementById("search-type").value;
  (typeInput === "Ad Interest") ? type = "adinterest" : type = "adinterestsuggestion";
  return type;
}

const getLocale = () => {
  let locale;
  let localeInput = document.getElementById("locale").value;
  if (localeInput === "English") {
    locale = "en_US";
  } else if (localeInput === "German") {
    locale = "de_DE";
  } else {
    locale = "es_ES";
  }
  return locale;
}

const setParams = () => {
  let keyword = getKeyword();
  let type = getSearchType();
  let locale = getLocale();
  if (type === "adinterestsuggestion") {
    params.set('interest_list', `["${keyword}"]`);
  } else {
    params.set('q', keyword);
  }
  params.set('locale', locale);
  params.set('type', type);
  let newUrl = baseUrl.toString();
  console.log(newUrl);
  return newUrl;
}

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// where is result passed as argument?
const showData = (result) => { // where is result passed as argument?
  const itemCard = document.createElement("div");
  const interest = document.createElement("p");
  const audience = document.createElement("p");
  const audienceSize = formatNumber(result.audience_size);

  itemCard.setAttribute("class", "item-card");
  interest.setAttribute("class", "interest")
  audience.setAttribute("class", "audience-size")

  interest.textContent = result.name;
  audience.textContent = audienceSize;
  resultsContainer.appendChild(itemCard);
  itemCard.appendChild(interest);
  itemCard.appendChild(audience);
}
// how to split this up into smaller functions?

// write function for adinterest to exclude options that don't include keyword?

const callApi = () => {
  $.ajax(setParams()).done((response) => {
    console.log(response);
    response.data.forEach(showData);
  })
}

const clearContent = () => {
  document.getElementById("results").innerHTML = "";
}

const resetAndCall = () => {
  clearContent();
  callApi();
}
