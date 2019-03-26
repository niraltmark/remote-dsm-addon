(function() {
  // Join meeting
  function joinMeetingReady() {
    return new Promise((resolve, _) => {
      Array.from(document.querySelectorAll("span")).forEach(el => {
        if (el.innerText === "JOIN MEETING") {
          resolve(el);
        }
      });

      let mutationObserver = new MutationObserver(
        (mutationRecords, observer) => {
          // Can use the mutation records for performance improvements
          Array.from(document.querySelectorAll("span")).forEach(el => {
            if (el.innerText === "JOIN MEETING") {
              resolve(el);
              observer.disconnect();
            }
          });
        }
      );

      mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    });
  }

  joinMeetingReady().then(el => {
    el.click();
  });
})();
