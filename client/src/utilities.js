// ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
//In Backend: access params using req.query
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
//In backend: access params using req.body
export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}
//Note: we should only send objects/arrays back using res.send() in our middleware!
//Utility functions try to parse it to JSON, so we shouldn't send plain numbers/tryings.

export function formatDate(timestamp) {
  //given unix timestamp (# of ms since epoch), returns corresponding date as a string
  const date = new Date(Number(timestamp));
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long", // 'long' for full month name
    day: "2-digit",
  });
  return formatter.format(date);
}

export function getDateTime(date) {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //convert to Date type if necessary
  if (typeof date === "string") date = new Date(date);
  // Convert to EST timezone
  const estTime = new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }));

  // Extract components
  const month = estTime.getMonth() + 1; // getMonth() returns 0-11
  const day = estTime.getDate();
  const year = estTime.getFullYear() - 2000; //24
  const hours = estTime.getHours();
  const minutes = estTime.getMinutes();
  const dayOfWeek = week[estTime.getDay()];

  // Convert 24-hour format to 12-hour format and set AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

  // Pad single digit minutes and seconds with a leading zero
  const paddedMinutes = minutes.toString().padStart(2, "0");

  // Format the date/time string
  return {
    date: `${dayOfWeek}, ${month}/${day}`,
    bareDate: `${month}/${day}`,
    time: `${formattedHours}:${paddedMinutes} ${ampm}`,
    dayOfWeek: dayOfWeek,
  };
}
