document.addEventListener("DOMContentLoaded", function () {
  var qr_cellsize = 8;
  var qr_margin = 2 * qr_cellsize;
  var qr_levels = ["M", "L"];

  var createImage = function(payload) {
    for (var levelIndex in qr_levels) {
      for (var typeNum = 1; typeNum <= 10; typeNum++) {
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
