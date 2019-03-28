// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.alarms.create("remote-dsm", {
    when: Date.now() + 1000
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  let now = new Date(Date.now());

  // Meeting should only happen in Sunday, Monday, Tuesday, Wednesday
  if (now.getDay() < 4) { 
    chrome.windows.create({
      url: 'https://meet.google.com/okq-fhzh-khm'
    }, function (window) {
      chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript(tab.id, {
          file: 'inject.js'
        });
      });
    });
  }
  
  chrome.alarms.clear("remote-dsm", function() {
    let now = new Date(Date.now());

    // Alert should not be trigger on Thursday, Friday, Saterday 
    let daysToAdd = (now.getDay() < 3) ? 1 : 7 - now.getDay();

    let meetingDateAndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToAdd, 10, 28);

    chrome.alarms.create("remote-dsm", {
      when: meetingDateAndTime.getTime()
    });
  });
});
