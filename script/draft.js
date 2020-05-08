// table build
var cellsToPush;
if (window.matchMedia("(min-width: 1570px)").matches) {
  columns = 5;
  pushCells(50,5);
}else if(window.matchMedia("(min-width: 1265px)").matches){
  columns = 4;
  pushCells(48,4);
}else if(window.matchMedia("(min-width: 963px)").matches){
  columns = 3;
  pushCells(48,3);
}else if(window.matchMedia("(min-width: 655px)").matches){
  columns = 2;
  pushCells(46,2);
}else{
  columns = 1;
  pushCells(46,1);
};
function pushCells(maxCells, columns){
  if(maxCells != 46){
    cellsToPush = maxCells - 46;
    for(i=0; i<cellsToPush; i++){
      document.getElementById("container").insertAdjacentHTML('beforeend',
      '<div class="cell"><div class="item empty"><input type="checkbox" value="" class="item_checkbox" disabled><div class="bg_icon_empty"><img src="" alt=""class="leader_icon"></div><span class="leader_name"></span></div></div>');
    };
  };
  if(cellsToPush == undefined){
    cellsToPush = 0;
  }
};

const allLeaders = [];
[].forEach.call(document.getElementsByClassName('item'), function(el) {
    allLeaders.push(el.id);
});
var filtered = allLeaders.filter(Boolean);

var bannedLeaders = [];

document.getElementById('container').onclick = function(){
  let target = event.target;
  if(target.id == "container" || target.className == "cell" || target.className.search(/empty/) != -1){
    return;
  }else{
    if(target.className == "item" || target.className == "item-banned" || target.className == "item-search"){
      let checkbox = target.childNodes[1];
      banningAndChecking(checkbox);
    }else if(target.parentNode.className == "item" || target.parentNode.className == "item-banned"){
      let checkbox = target.parentNode.childNodes[1];
      banningAndChecking(checkbox);
    }
    else if(target.parentNode.parentNode.className == "item"  || target.parentNode.parentNode.className == "item-banned"){
      let checkbox = target.parentNode.parentNode.childNodes[1];
      banningAndChecking(checkbox);
    }
  };
};
function banningAndChecking(checkbox){
  if(checkbox.hasAttribute('checked')){
    document.getElementById('remain').childNodes[1].innerHTML = +document.getElementById('remain').childNodes[1].innerHTML -1;
    document.getElementById('banned').childNodes[1].innerHTML = +document.getElementById('banned').childNodes[1].innerHTML +1;
    checkbox.removeAttribute('checked');
    checkbox.parentNode.classList.toggle("item");
    checkbox.parentNode.classList.toggle("item-banned");
  } else{
    document.getElementById('remain').childNodes[1].innerHTML = +document.getElementById('remain').childNodes[1].innerHTML +1;
    document.getElementById('banned').childNodes[1].innerHTML = +document.getElementById('banned').childNodes[1].innerHTML -1;
    checkbox.setAttribute('checked', null);
    checkbox.parentNode.classList.toggle("item");
    checkbox.parentNode.classList.toggle("item-banned");
  }
}
// BANS RESET
function banReset(){
  document.getElementById('remain').childNodes[1].innerHTML = 46;
  document.getElementById('banned').childNodes[1].innerHTML = 0;
  let checkboxes = document.getElementsByClassName("item_checkbox");
  for (var i = 0, length = checkboxes.length; i < length; i++) {
    if(checkboxes[i].hasAttribute('checked')){} else{
      if(checkboxes[i].hasAttribute('disabled')){return;}
      checkboxes[i].setAttribute('checked', null);
      checkboxes[i].parentNode.classList.toggle("item");
      checkboxes[i].parentNode.classList.toggle("item-banned");
    }
  }
}
function changeQuantity(players, nations){
  let players_qt = document.getElementsByName("players_qt")[0];
  let leaders_qt = document.getElementsByName("leaders_qt")[0];
  leaders_qt.value = nations;
  players_qt.value = players;
}

// SEARCH

document.getElementById("search_search").oninput = function () {
    let val = this.value.trim();
    val = val.toLowerCase();
    let items = document.querySelectorAll('.leader_name');
    if (val != '') {
        items.forEach(function (elem) {
            if (elem.innerText.toLowerCase().search(val) == -1) {
              elem.parentNode.classList.remove("item-search");
            }
            else {
              elem.parentNode.classList.add("item-search");
            }
        });
    }
    else {
        items.forEach(function (elem) {
            elem.parentNode.classList.remove("item-search");
        });
    }
}
const parent = document.getElementById("container");
const sortButton = document.getElementById("sort_button_inside").firstChild;
//change table to invisisble function

function tableOpacityToZero(){
  if(parent.classList.contains("tableLoadingToOne")){
    parent.classList.remove("tableLoadingToOne");
  }
  parent.classList.add("tableLoadingToZero");
}
//change table to visisble function
function tableOpacityToOne(){
  parent.classList.remove("tableLoadingToZero");
  parent.classList.add("tableLoadingToOne");
  console.log(parent);
}
//SORT
sortButton.addEventListener("click", sortAZ);

//AZ

function sortAZ(){
  tableOpacityToZero();
  let cells = [...document.querySelectorAll('.cell')];
  for(i = 0; i<cellsToPush; i++){
    cells.pop();
  };
  let sortedCells = cells.sort(function(a,b){
    if(a.children[0].children[2].innerText > b.children[0].children[2].innerText){
      return 1;
    }else{
      return -1;
    };
  });
  for(let cell of sortedCells){
    parent.children[46].insertAdjacentElement('beforebegin', cell);
  };
  tableOpacityToOne();

  sortButton.removeEventListener("click", sortAZ);
  sortButton.addEventListener("click", sortZA);
  document.getElementById("sort_button_inside").firstChild.innerText = "Я-А";
};

//ZA

function sortZA(){
  tableOpacityToZero();
  let cells = [...document.querySelectorAll('.cell')];
  for(i = 0; i<cellsToPush; i++){
    cells.pop();
  };
  let sortedCells = cells.sort(function(a,b){
    if(a.children[0].children[2].innerText > b.children[0].children[2].innerText){
      return 1;
    }else{
      return -1;
    };
  });
  for(let cell of sortedCells){
    parent.insertAdjacentElement('afterbegin', cell);
  };
  tableOpacityToOne();

  sortButton.removeEventListener("click", sortZA);
  sortButton.addEventListener("click", sortAZ);

  document.getElementById("sort_button_inside").firstChild.innerText = "А-Я";
};

//

const swapButton = document.getElementById("navigation").children[2];
swapButton.addEventListener("click", swapToNations);

function swapToNations(){
  swapButton.innerText = 'Скрыть нации';
  tableOpacityToZero();
  function cycleOne(){
    for(i=0; i<46; i++){
      let childSpan = parent.children[i].children[0];
      let nationName = childSpan.getAttribute("nation");
      let leaderFullName = childSpan.getAttribute("leader");
      let leaderName;
      if(leaderFullName.search(" ") != -1){
        let leaderFirstName = leaderFullName.slice(0, leaderFullName.search(" "));
        leaderName = leaderFirstName + ' | ' + nationName;
      }else{
        leaderName = leaderFullName + ' | ' + nationName;
      };
      childSpan.children[2].innerText = leaderName;
    };
  };
  setTimeout(cycleOne, 75);
  swapButton.removeEventListener("click", swapToNations);
  swapButton.addEventListener("click", swapToLeadersName);
  setTimeout(tableOpacityToOne, 10);
};

function swapToLeadersName(){
  tableOpacityToZero();
  function cycleTwo(){
    for(i=0; i<46; i++){
      let childSpan = parent.children[i].children[0];
      let leaderName = childSpan.getAttribute("leader");
      childSpan.children[2].innerText = leaderName;
    };
  }
  setTimeout(cycleTwo, 75);
  swapButton.removeEventListener("click", swapToLeadersName);
  swapButton.addEventListener("click", swapToNations);
  swapButton.innerText = 'Показать нации';
  setTimeout(tableOpacityToOne, 10);
};
