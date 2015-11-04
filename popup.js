document.addEventListener("DOMContentLoaded", function () {

  // Chrome has a hardcoded popup window size limit of 800x600
  var max_window_height = 600;
  var max_qrcode_height = max_window_height - 75; // Reserve "some" space for UI

  var qr_levels = ["M", "L"];
  var qr_modules_by_version = {
    1: 21, 2: 25, 3: 29, 4: 33, 5: 37,
    6: 41, 7: 45, 8: 49, 9: 53, 10: 57
  }

  var createImage = function(payload) {
    var qr_margin = 4;

    for (var levelIndex in qr_levels) {
      for (var typeNum = 1; typeNum <= 10; typeNum++) {
        var qr_cellsize = Math.floor(max_qrcode_height / qr_modules_by_version[typeNum]);
        try {
          var qr = qrcode(typeNum, qr_levels[levelIndex]);
          qr.addData(payload);
          qr.make();
          return qr.createImgTag(qr_cellsize, qr_margin);
        } catch(e) {
          if (strStartsWith(e.message, "code length overflow")) {
            // ignore and try to use bigger QR code format
          } else {
            throw e;
          }
        }
      }
    }
  };

  var updateImage = function() {
    payload = document.getElementById("textbox").value;
    document.getElementById("insert-qrcode-here").innerHTML =
      createImage(payload) || "Error. URL too long?";
  };

  var strStartsWith = function(string, prefix) {
    return !string.indexOf(prefix);
  };

  document.getElementById("close").onclick = function() {
    window.close();
  };

  document.getElementById("textbox").onchange = function() {
    updateImage();
  };

  document.getElementById("textbox").onkeyup = function() {
    updateImage();
  };

  document.getElementById("textbox").onclick = function() {
    this.select();
  };

  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById("textbox").value = tab.url;
    document.getElementById("textbox").select();
    updateImage();
  });
});
