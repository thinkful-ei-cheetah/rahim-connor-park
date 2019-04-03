'use strict';
/*global $ */

function createElement(data) {
  return `<li><p>${data.fullName}</p>
  <p>${data.description}</p><p>${data.url}</p></li>`;
}

function getData(data) {
  data.map(function(park) {
    console.log(createElement(park));
    $('.js-parks-results').append(createElement(park));
  });
}

function parseStates(states) {
  console.log(states);
  const newStates = states.split(',');
  return newStates;
}
const apiKey = 'JhAKNM1ZznXiVCa2TWMFK5RhA2NifSU1nMz4RshQ';
const address = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);

  return queryItems.join('&');
}

function formatArrayParams(params) {
  let arrayItems = params
    .map(function(value) {
      return `stateCode=${value}&`;
    })
    .join('');
  return arrayItems;
}

function getParams(query, maxResults = 10) {
  const stateCode = formatArrayParams(query);
  const params = {
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = address + '?' + stateCode + queryString;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      getData(responseJson.data);
    });
}

function main() {
  $('.js-state-parks').on('submit', function(event) {
    event.preventDefault();
    $('li').remove();
    const states = parseStates($('#state-parks').val());
    const count = $('#number-of-parks').val();
    getParams(states, count);
  });
}

$(main);
