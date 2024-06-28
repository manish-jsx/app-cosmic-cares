var vH = 0; // video height
var vW = 0; // video width
var aspRatio = isMobile ? 0.6 : 1.77777777778;
var videoID = 0;
var vimeo_int;
var hasImages = false;
var vimeo_player = document.getElementById("vimeo_player");
//var socket = io('https://vstats.messiasoliveira.com');
var intervalTime = 5; // em segundos
var time = intervalTime;
var intervalStatus;
var isTracking = false;
var videoDuration = 6000;

function initializeVimeo(video, width, language) {
  vW = width;
  vH = parseInt(vW / aspRatio);
  aspRatio = vW / vH;
  videoID = video;
  $("#video_main").css("height", vH);
  // unmute
  if (isMobile) {
    $("#video_main").prepend(
      '<div id="unmute_wrapper_mobile" style="z-index:3"></div>'
    );
  } else {
    $("#video_main").prepend(
      '<div id="unmute_wrapper"><img src="//video.astro.cosmiccares.org/images/unmute-en2.png" id="unmute"/></div>'
    );
  }
  if (language) {
    $("#unmute").on("click", function () {
      vimeo_player.getPaused().then(function (paused) {
        if (paused) {
          vimeo_player.play();
          $("#cover").removeClass("paused");
        }
      });
      //vimeo_player.setVolume(1);
      vimeo_player.setMuted(0);
      $("#unmute_wrapper").remove();
      $("#pergaminho_top").css("margin-top", "20px");
    });
    $("#unmute_wrapper_mobile").on("click", function () {
      //vimeo_player.setVolume(1);
      vimeo_player.setMuted(0);
      $(this).remove();
    });
  }
}
function aspectRatio() {
  var newWidth = vW;
  var newHeight = vH;
  var leftUnmute = 0;
  var leftCover = 0;

  if ($("#vimeo_player").width() < vW) {
    // Se a tela é menor que o tamanho do vídeo, então redimensiona
    newWidth = $("#vimeo_player").width();
    newHeight = parseInt($("#vimeo_player").width() / aspRatio);
  }
  if (isMobile) {
    leftUnmute = parseInt(($("body").width() - newWidth) / 2);
    leftCover = parseInt(($("#vimeo_player").width() - vW) / 2);
  } else {
    leftCover = parseInt(($("#vimeo_player").width() - vW) / 2);
  }
  if (leftUnmute < 0) leftCover = 0;
  if (leftCover < 0) leftCover = 0;

  $("#vimeo_player iframe").css("height", newHeight);
  $("#vimeo_player iframe").css("width", newWidth);

  $("#cover").css("height", newHeight);
  $("#cover").css("width", newWidth);
  $("#cover").css("left", leftCover);

  $("#unmute_wrapper_mobile").css("height", newHeight);
  $("#unmute_wrapper_mobile").css("width", newWidth);
  $("#unmute_wrapper_mobile").css("left", leftUnmute);

  if ($("#unmute").length) {
    $("#unmute").css("width", newWidth);
  }

  if (hasImages) {
    $("#pergaminho_top").css("width", newWidth);
    $("#pergaminho_top").css("margin-left", "auto");
    $("#pergaminho_top").css("margin-right", "auto");
    $("#pergaminho_bottom").css("width", newWidth);
    $("#pergaminho_bottom").css("margin-left", "auto");
    $("#pergaminho_bottom").css("margin-right", "auto");
  }
}

$(document).ready(function () {
  aspectRatio();
});
$(window).resize(function () {
  aspectRatio();
});

function initVimeo() {
  var options = {
    id: videoID,
    background: true,
    allowfullscreen: true,
    loop: false,
  };

  vimeo_player = new Vimeo.Player("vimeo_player", options);
  $("#unmute").show();

  vimeo_player.on("play", function () {
    if (!isMobile) {
      $(".pergaminho").show();
      hasImages = true;
    }
    aspectRatio();
    $("#video_main").css("height", "unset");
    $("#cover").removeClass("loading");
    if (isTracking) return;
    isTracking = true;
    socket.emit("time", { video: "result", cur: 0, duration: videoDuration });
    startStatus();
  });
  vimeo_player.on("ended", function () {
    vimeo_player
      .destroy()
      .then(function () {
        $("#video_main").hide();
        $("#form").show();
        socket.emit("time", {
          video: "result",
          cur: videoDuration,
          duration: videoDuration,
        });
        pauseStatus();
        socket.disconnect();
      })
      .catch(function (error) {});
  });
  vimeo_player.getDuration().then(function (d) {
    videoDuration = parseInt(d);
  });
}

$(document).ready(function () {
  $.getScript("https://player.vimeo.com/api/player.js", function () {
    vimeo_int = setInterval(function () {
      if (typeof Vimeo === "object") {
        initVimeo();
        clearInterval(vimeo_int);
      }
    }, 500);
  });
});
// Controla play/pause
$("#cover").on("click", function () {
  vimeo_player.getPaused().then(function (paused) {
    if (paused) {
      startStatus();
      vimeo_player.play();
      $("#cover").removeClass("paused");
    } else {
      pauseStatus();
      vimeo_player.pause();
      $("#cover").addClass("paused");
    }
  });
});
// Track
function pauseStatus() {
  clearInterval(intervalStatus);
}
function startStatus() {
  intervalStatus = setInterval(function () {
    socket.emit("time", {
      video: "result",
      cur: time,
      duration: videoDuration,
    });
    time += intervalTime;
  }, intervalTime * 1000);
}
