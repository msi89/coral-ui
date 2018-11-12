/* input tag*/
var InputTagItemNumber = 0;
var InputTagItems = [];

function addInputTagItem(tag) {
  InputTagItems[InputTagItemNumber] = tag;
  var parent = document.querySelector(".input-tag-content");
  var newTag =
    '<span id="tagItem' +
    InputTagItemNumber +
    '" class="input-tag-item">' +
    tag +
    '<i onclick="removeInputTagItem(' +
    InputTagItemNumber +
    ');">x</i></span>';
  parent.insertAdjacentHTML("beforeend", newTag);
  InputTagItemNumber++;
}
function removeInputTagItem(index) {
  var parent = document.querySelector("#tagItem" + index);
  parent.parentNode.removeChild(parent);
  InputTagItems.splice(index, 1);
  InputTagItemNumber--;
  return false;
}
function getInputTagItems() {
  return InputTagItems;
}

$(function() {
  //NOTIFICATION
  $("body").append('<div id="notify-box" class="notification-box"></div>');
  $(".clear").click(function() {
    $(this)
      .parent()
      .fadeOut("slow");
  });

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

  //DROPDOWN
  $(".dropdown-button").click(function() {
    var $menu = $(this)
      .parent()
      .children(".dropdown-menu");
    $menu.toggle("fast");
  });
  $(".dropdown-content a").click(function() {
    $(this)
      .closest(".dropdown-menu")
      .toggle("fast");
  });

  // Menu
  var Accordion = function(el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var nav_menu_item = this.el.find(".nav_menu_item");
    nav_menu_item.on(
      "click",
      { el: this.el, multiple: this.multiple },
      this.dropdown
    );
  };

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.nav_submenu_item
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el
        .find(".nav_submenu_item")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  var accordion = new Accordion($(".nav_menu"), false);
});
//RESPONSIVE TABLES
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#tag_input").onkeyup = function(e) {
    /*space =32 ,=188 ;=59*/ if (e.keyCode == "188") {
      var tag = this.value.replace(",", "");
      if (tag != "") {
        addInputTagItem(tag);
        this.value = "";
      }
    }
    if (e.keyCode == "190") {
      var tag = this.value.replace(";", "");
      if (tag != "") {
        addInputTagItem(tag);
        this.value = "";
      }
    }
    if (e.keyCode == "32") {
      /* var tag = this.value.replace(/\s/g, ""); if(tag !="") { 	addInputTagItem(tag); 	this.value =''; }*/
    }
  };
  document.querySelectorAll(".datagrid").forEach(function(table) {
    let labels = Array.from(table.querySelectorAll("th")).map(function(th) {
      return th.innerText;
    });
    table.querySelectorAll("td").forEach(function(td, i) {
      td.setAttribute("data-label", labels[i % labels.length]);
    });
  });

  document.querySelectorAll(".menu-list li a").forEach(function(item) {
    item.classList.remove("is-active");
    item.onclick = () => {
      item.classList.add("is-active");
    };
  });
});
