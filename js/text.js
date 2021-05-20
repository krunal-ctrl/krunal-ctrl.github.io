//Tewt write when the page was load
var currentdate = new Date();
run = [
  '<span class="indice">Run </span><span class="colored">TerminalPortfolio</span>',
  '<span class="indice">[' +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds() +
    "]</span>",
  "┌=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-┐",
  "|    ______              _           __  ___           __  ___     ___       |",
  "¦   /_  __/__ ______ _  (_)__  ___ _/ / / _ \\___  ____/ /_/ _/__  / (_)__    ¦",
  "|    / / / -_) __/  \\ \\/ / _ \\/ _ `/ / / ___/ _ \\/ __/ __/ _/ _ \\/ / / _ \\   |",
  "¦   /_/  \\__/_/ /_/_/_/_/_//_/\\_,_/_/ /_/   \\___/_/  \\__/_/ \\___/_/_/\\___/   ¦",
  '|                                                                  <span class="indice">[1.12]</span>    |',
  "└=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-┘",
  'Welcome to you on my <span class="colored">portfolio<span>',
  "To start enter the command <span class=\"command\">'help'<span>",
];

// Text for the command 'Help'
help = [
  "<br>",
  '<span class="command">about</span>          Learn more about me',
  '<span class="command">works</span>          Show my works',
  '<span class="command">social</span>         Displays social networks',
  '<span class="command">contact</span>        Get my email',
  '<span class="command">credits</span>        Show the credits',
  '<span class="command">historic</span>       View my order history',
  '<span class="command">color</span>          Enter color with a number 0 to 8 for change the apparence',
  '<span class="command">clear</span>          reset commands',
  '<span class="command">shutdown</span>       Stop the machin',
  '<span class="command">ping</span>',
  "<br>",
];
//Link for Download, Please don't change this
var download = "http://valentinsld.fr/Terminal/TerminalPortfolio.rar";
// email
var email =
  '<a href="mailto:krunaljethva90.com">krunaljethva90.com</a>';

// Link to MyWebSite, Please don't change this
var MyWebSite = "http://valentinsld.fr/";
// Text for the command 'about'
about = [
  "<br>",
  "Hello there !",
  "My name is Krunal Jethva.",
  "I'm computer engineer student from india",
  "Welcome to my website.",
  "Feel free to explore and add new feature or suggest me some.",
  "<br>",
];

//link social
var github = "https://github.com/krunal-ctrl/";
var linkedin = "https://www.linkedin.com/in/krunal-jethva/";
var twitter = "https://twitter.com/jethva_krunal";
var instagram = "https://www.instagram.com/krunal_jethva_14/";

//social
social = [
  "<br>",
  'github         <a href="' + github + '" target="_blank">' + github + "</a>",
  'linkedin       <a href="' +
    linkedin +
    '" target="_blank">' +
    linkedin +
    "</a>",
  'twitter        <a href="' +
    twitter +
    '" target="_blank">' +
    twitter +
    "</a>",
  'instagram      <a href="' +
    instagram +
    '" target="_blank">' +
    instagram +
    "</a>",
  "<br>",
];

//open windows
var openWindow = "new open window";

//works
var worksOpen = "works open";
var worksClos = "works close";

//credits
credits = [
  '<span class="margin">Modified for Personal use by <a href="https://github.com/krunal-ctrl"/>krunal-ctrl</a></span>',
  '<span class="margin">I have removed or add feature according to my neeeds but huge credits goes to below people</span>',
  "<br>",
  '<span class="margin">Developement By <a href="' +
    MyWebSite +
    '" target="_blank">valentin SLD</a>, student at Bordeaux Montaigne</span>',
  '<span class="margin">Thanks to <a href="http://maximefreund.com/" target="_blank">Maxime Freund</a> for their help</span>',
  '<span class="margin">Thanks to shachi for the script caret.js</span>',
  '<span class="margin">Thanks to taye for the script <a href="https://interactjs.io/" target="_blank">interact.js</a> on Github</span>',
  "<br>",
];
