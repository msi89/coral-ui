// //  for npm app
//import $ from "jquery";
$(function() {
  //NOTIFICATION
  $("body").append('<div id="notify-box" class="notification-box"></div>');

  var toast = 0;
  $("#notify").click(function() {
    var hash =
      '<div id="toast' +
      toast +
      '"  class="notification is-danger" style="display:none"> ' +
      '<button onclick="$(this).parent().hide()" class="clear">x</button>' +
      " </p>Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem</p>" +
      "</div>";
    $("#notify-box").append(hash);
    var cur = $("#toast" + toast);
    cur.fadeIn("slow", function() {
      setInterval(function() {
        cur.fadeOut("slow");
        // $('#notify-box').remove(cur);
        toast--;
      }, 10000);
    });
    toast++;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var InputTagItemNumber = 0;
  var InputTagItems = [];

  function addInputTagItem(tag) {
    InputTagItems[InputTagItemNumber] = tag;
    var parent = document.querySelector(".input-tag-content");
    var newTag =
      '<span id="tagItem' +
      InputTagItemNumber +
      '" class="input-tag-item" data-indice="' +
      InputTagItemNumber +
      '" data-value="' +
      tag +
      '">' +
      tag +
      "<i>x</i></span>";
    parent.insertAdjacentHTML("beforeend", newTag);
    InputTagItemNumber++;
  }

  // table responsive
  document.querySelectorAll(".datagrid").forEach(function(table) {
    let labels = Array.from(table.querySelectorAll("th")).map(function(th) {
      return th.innerText;
    });
    table.querySelectorAll("td").forEach(function(td, i) {
      td.setAttribute("data-label", labels[i % labels.length]);
    });
  });

  window.addEventListener("click", function(e) {
    //remove tag input
    document.querySelectorAll(".input-tag-item i").forEach(itag => {
      if (itag.contains(e.target)) {
        var itag_id = itag.parentNode;
        var itag_indice = itag_id.getAttribute("data-indice");
        itag_id.parentNode.removeChild(itag_id);
        InputTagItems.splice(itag_indice, 1);
        InputTagItemNumber--;
      }
    });
    document.querySelectorAll(".clear").forEach(clear => {
      if (clear.contains(e.target)) {
        fadeOut(clear.parentNode);
        //clear.parentNode.style.display = "none";
      }
    });
    // dropdown
    document.querySelectorAll(".dropdown").forEach(dropdown => {
      if (dropdown.contains(e.target)) {
        dropdown.classList.toggle("is-active");
      } else {
        dropdown.classList.remove("is-active");
      }
    });

    //input tag
    document.addEventListener("keyup", function(e) {
      var ti = document.getElementById("tag_input");
      if (ti.contains(e.target)) {
        //     /*space =32 ,=188 ;=59*/

        var tag = "";
        if (e.keyCode == "188") {
          tag = ti.value.replace(",", "");
          if (tag != "") {
            addInputTagItem(tag);
            ti.value = "";
          }
        }
        if (e.keyCode == "190") {
          tag = ti.value.replace(";", "");
          if (tag != "") {
            addInputTagItem(tag);
            ti.value = "";
          }
        }
        if (e.keyCode == "32") {
          /* var tag = this.value.replace(/\s/g, ""); if(tag !="") { 	addInputTagItem(tag); 	this.value =''; }*/
        }
      }
    });

    //accordion
    document.querySelectorAll(".menu-list li a").forEach(atg => {
      if (atg.contains(e.target)) {
        atg.classList.add("switched");
        if (atg.getAttribute("data-expand") == "true") {
          atg.classList.toggle("collapsed");
          atg.classList.toggle("collapsed");
          var panel = atg.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.display = "none";
            panel.style.maxHeight = null;
          } else {
            panel.style.display = "block";
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        }
      } else {
        atg.classList.remove("switched");
      }
    });

    //others
  });
});
//utils
function fadeIn(el) {
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}
function fadeOut(el) {
  var fadeEffect = setInterval(function() {
    if (!el.style.opacity) {
      el.style.opacity = 1;
    }
    if (el.style.opacity > 0) {
      el.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      el.style.display = "none";
    }
  }, 30);
}
function hide(el) {
  el.style.display = "none";
}
function show(el) {
  el.style.display = "";
}
function contains(el, child) {
  return el !== child && el.contains(child);
}
function append(parent, el) {
  parent.appendChild(el);
}
function before(htmlString, el) {
  el.insertAdjacentHTML("beforebegin", htmlString);
}
function after(htmlString, el) {
  el.insertAdjacentHTML("afterend", htmlString);
}
function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else el.className += " " + className;
}
