// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    color: '#3aa757'
  }, function () {
    console.log("The color is green.");
  });

  chrome.alarms.clear("remote-dsm");

  chrome.alarms.create("remote-dsm", {
    when: Date.now() + 1000

    // when: new Date('3/22/2019 23:45:00').getTime()
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.windows.create({
    url: 'https://meet.google.com/seq-zjvw-nvs'
  }, function (window) {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.executeScript(tab.id, {
        file: 'inject.js'
      });
    });
  });

  // Remove the alarm and set it to another time?

  // Now lets open a window of hangouts
});