// The goal of this file or of this module is to contain a coiple of functions that we reuse over and over in our project
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);
    return data; // this return data is going to be the resolved value of the promise that getJSON function returns
  } catch (err) {
    throw err;
  }
};
