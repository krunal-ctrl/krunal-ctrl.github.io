/***************************
    </> by Valentin SLD
***************************/
var before = document.getElementById("before");
var getter = document.getElementById("getter");
var pw = false;
let psw = false;
var cmd = document.getElementById("writer"); //zone d'ecriture
var textarea = document.getElementById("setter"); //textarea
var terminal = document.getElementById("terminal"); //commandes entré
var historique = []; // historique des commandes
var valueH = 0;
var frame = document.getElementsByClassName("container");
var close = document.getElementById("close");
// frame project
var back = document.getElementsByClassName("btn-back");
var project = document.getElementsByClassName("prez-2");
var projectLink = document.getElementsByClassName("btn-direction");

window.onload = function () {
  document.querySelector(".animation").innerHTML =
    '<img src="img/animation.gif" alt="animation start launching" />';
  setTimeout(500);

  //After load animation run()
  setTimeout(function () {
    boucleWrite(run, "", 120);
    document.querySelector(".animation").remove();
    textarea.focus();
  }, 7800);
};

window.addEventListener("keyup", enterKey);
//close vbtn frame
close.addEventListener("mousedown", function () {
  close.src = "img/X2.png";
});
close.addEventListener("mouseup", function () {
  close.src = "img/X.png";
  frame[0].classList.remove("open");
  enableProject();
  addLine("window close", "colored", 10);
  textarea.focus();
});

//init
textarea.value = "";
cmd.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (e.keyCode == 13) {
    historique.push(cmd.innerHTML);
    valueH = historique.length;
    addLine("admin> " + cmd.innerHTML, "no-animation", 0);
    testValue(cmd.innerHTML.toLowerCase());
    cmd.innerHTML = "";
    textarea.value = "";
  } else if (e.keyCode == 38 && valueH != 0) {
    valueH -= 1;
    textarea.value = historique[valueH];
    cmd.innerHTML = textarea.value;
  } else if (e.keyCode == 40 && valueH != historique.length) {
    valueH += 1;
    if (historique[valueH] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = historique[valueH];
    }
    cmd.innerHTML = textarea.value;
    // }
  }
}

function testValue(test) {
  switch (test.toLowerCase()) {
    case "help":
      boucleWrite(help, "", 100);
      break;
    case "about":
      boucleWrite(about, "colored margin", 120);
      break;
    case "social":
      boucleWrite(social, "colored", 120);
      break;
    case "contact":
      addLine("My email :  " + email, "colored", 100);
      break;
    case "works":
      addLine("window open", "colored", 10);
      frame[0].classList.add("open");
      break;
    case "credits":
      boucleWrite(credits, "colored", 120);
      break;

    //social link
    case "social github":
      openTab(github, 1000);
      break;
    case "social linkedin":
      openTab(linkedin, 1000);
      break;
    case "social twitter":
      openTab(twitter, 1000);
      break;
    case "social instagram":
      openTab(instagram, 1000);
      break;

    //color
    case "color":
      addLine(
        "Enter color with a number 0 to 8 for change the apparence",
        "colored",
        0
      );
      break;
    case "color 0":
      document.body.classList = "";
      addLine("Reset :(", "colored", 100);
      break;
    case "color 1":
      document.body.classList = "color1";
      addLine("HOoooo :O", "colored", 100);
      break;
    case "color 2":
      document.body.classList = "color2";
      addLine("HOooooo :O", "colored", 100);
      break;
    case "color 3":
      document.body.classList = "color3";
      addLine("HOoooooo :O", "colored", 100);
      break;
    case "color 4":
      document.body.classList = "color4";
      addLine("HOooooooo :O", "colored", 100);
      break;
    case "color 5":
      document.body.classList = "color5";
      addLine("HOoooooooo :O", "colored", 100);
      break;
    case "color 6":
      document.body.classList = "color6";
      addLine("HOooooooooo :O", "colored", 100);
      break;
    case "color 7":
      document.body.classList = "color7";
      addLine("HOoooooooooo :O", "colored", 100);
      break;
    case "color 8":
      document.body.classList = "color8";
      addLine("HOooooooooooo :O", "colored", 100);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "shutdown":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      getter.classList.add("shutdown");
      var x = document.getElementById("setter");
      x.parentNode.removeChild(x);

      cmd.innerHTML = "";
      textarea.value = "";
      document.body.classList = "shutdown";
      addLine("Press F5 to restart the machine", "white", 2500);
      break;
    case "ping":
      addLine("Pong !", "colored", 100);
      break;
    case "historic":
      addLine("<br>", "", 0);
      boucleWrite(historique, "colored", 120);
      addLine("<br>", "", 120 * historique.length + 50);
      break;

    default:
      addLine("Command not recognized. Test the command 'help'", "error", 100);
      break;
  }
}

function boucleWrite(name, classe, time) {
  name.forEach(function (item, index) {
    addLine(item, classe, index * time);
  });
}

function addLine(text, classe, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }

  setTimeout(function () {
    var txt = document.createElement("p");
    txt.innerHTML = t;
    txt.className = classe;

    before.parentNode.insertBefore(txt, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function openTab(link, time) {
  addLine("open in " + time / 1000 + "s", "colored", 0);
  setTimeout(function () {
    window.open(link, "_blank");
  }, time);
}

//***********************//
//      Interact JS      //
//***********************//

//change top and bottom text frame
var topF = document.querySelector("#toped");
var bottom = document.querySelector(".b1");

interact(".resize-drag")
  .draggable({
    ignoreFrom: ".undrag",
    onmove: window.dragMoveListener,
    restrict: {
      restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
  })
  .pointerEvents({
    ignoreFrom: ".undrag",
  })
  .resizable({
    inertia: true,

    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    // keep the edges inside the parent
    restrictEdges: {
      outer: "parent",
      endOnly: true,
    },

    // minimum size
    restrictSize: {
      min: { width: 560, height: 500 },
    },

    inertia: true,
  })
  .on("resizemove", function (event) {
    var target = event.target,
      x = parseFloat(target.getAttribute("data-x")) || 0,
      y = parseFloat(target.getAttribute("data-y")) || 0;

    // update the element's style
    target.style.width = event.rect.width + "px";
    target.style.height = event.rect.height + "px";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px," + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  });

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// project open
for (let j = 0; j < project.length; j++) {
  back[j].addEventListener("mousedown", function () {
    enableProject();
  });
  projectLink[j].addEventListener("mousedown", function () {
    let u = document.getElementById(projectLink[j].dataset.directionProject);
    u.classList.add("prez-show");
    topF.innerHTML = projectLink[j].dataset.top;
  });
}

function enableProject() {
  for (let i = 0; i < project.length; i++) {
    project[i].classList.remove("prez-show");
    topF.innerHTML = "My Works";
  }
}
