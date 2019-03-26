// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.alarms.create("remote-dsm", {
    when: new Date('3/27/2019 10:28:00').getTime()
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.windows.create({
    url: 'https://meet.google.com/okq-fhzh-khm'
  }, function (window) {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.executeScript(tab.id, {
        file: 'inject.js'
      });
    });
  });
  
  chrome.alarms.clear("remote-dsm", function() {
    let now = new Date(Date.now());
    let meetingDateAndTime = new Date(now.getFullYear(), now.getMonth(), now.getDay(), 10, 28);
    let nextMeetingDateAndTime = new Date(meetingDateAndTime.getDate() + 1);

    chrome.alarms.create("remote-dsm", {
      when: nextMeetingDateAndTime.getTime()
    });
  });
});
