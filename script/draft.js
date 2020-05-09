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
//modal window
const overlay = document.getElementById("modal_overlay");
function modalWindowVisible(modalId){
  overlay.classList.add("activeOverlay");
  if(modalId == 1){
    let bannedNationsQt = 46 - +document.getElementsByName("players_qt")[0].value * +document.getElementsByName("leaders_qt")[0].value
    if(bannedNationsQt<=0){
      overlay.children[0].children[0].children[2].innerText = 'При указанном количестве игроков и лидеров на каждого игрока вы не можете никого банить, измените настройки';
    }else{
      overlay.children[0].children[0].children[2].innerText = 'При указанном количестве игроков и лидеров на каждого игрока, нельзя забанить больше чем ' + bannedNationsQt + ' лидеров, измените настройки';
    }
    overlay.children[0].classList.add("activeModal");
  }else if (modalId == 2) {
    overlay.children[0].children[0].children[2].innerText = 'Количество игроков или лидеров на каждого игрока слишком большое, измените настройки'
    overlay.children[0].classList.add("activeModal");
  }
}
function modalWindowHidden(){
    overlay.classList.remove("activeOverlay");
    overlay.children[0].classList.remove("activeModal");
}

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
  let remainsBlock = document.getElementById('remain').childNodes[1].innerHTML;
  let bannedBlock = document.getElementById('banned').childNodes[1].innerHTML;
  let players = document.getElementsByName("players_qt")[0].value;
  let leaders = document.getElementsByName("leaders_qt")[0].value;
  if(checkbox.hasAttribute('checked')){
    if(document.getElementById('remain').childNodes[1].innerHTML <= players*leaders){
      modalWindowVisible(1);
    }else{
      document.getElementById('remain').childNodes[1].innerHTML = +remainsBlock -1;
      document.getElementById('banned').childNodes[1].innerHTML = +bannedBlock +1;

      checkbox.removeAttribute('checked');
      checkbox.parentNode.classList.toggle("item");
      checkbox.parentNode.classList.toggle("item-banned");
    }
  } else{
    document.getElementById('remain').childNodes[1].innerHTML = +remainsBlock +1;
    document.getElementById('banned').childNodes[1].innerHTML = +bannedBlock -1;

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

//oh fuck we r starting
function startingDraft(){
  let players = document.getElementsByName("players_qt")[0].value;
  let nationsPerPlayer = document.getElementsByName("leaders_qt")[0].value;



  let checkboxes = document.getElementsByClassName("item_checkbox");
  let cellsArr = [];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
  };

  for(i=0;i<checkboxes.length; i++){
    if(checkboxes[i].hasAttribute("disabled") != true && checkboxes[i].hasAttribute("checked")){
      cellsArr.push(checkboxes[i].parentNode)
    };
  };

  if(cellsArr.length< players*nationsPerPlayer){
    modalWindowVisible(2);
    return;
  }
  shuffleArray(cellsArr);

  let leaderName;
  let nation;
  let nationAbb;
  // creating draft table and text for clipboard

  let divResult = document.createElement('div');
  divResult.id = 'result';

  function draftTableCreate(){
    if(document.getElementById('test') != null){
      document.getElementById("result").children[0].remove();
    }else{
      document.getElementById("result").remove();
      document.getElementById("main").append(divResult.cloneNode(true));
    }

    let playerBlockNationItem = document.createElement('div');
    playerBlockNationItem.classList.add('draft_table_cell_item');
    playerBlockNationItem.innerHTML = '<img src="" alt=""><span>1</span>';

    let playerBlock = document.createElement('div');
    playerBlock.classList.add('draft_table_cell');
    playerBlock.innerHTML = "<h4></h4>";

    let maxNations = players * nationsPerPlayer;
    players = +players;
    let p = 0;
    let n = 0;
    let textForClipboard = '';

    for(k=0; k < players; k++){
      p = k+1;
      document.getElementById("result").append(playerBlock.cloneNode(true));
      document.getElementById("result").children[k].innerText = "Игрок " + p;
      if(k > 0){
        textForClipboard = textForClipboard + "\nИгрок " + p + ':   ';
      }else{
        textForClipboard = textForClipboard + "Игрок " + p + ':   ';
      }
      for(i=0; i<nationsPerPlayer; i++){
        nation = cellsArr[n].attributes.nation.value;
        leaderName = cellsArr[n].attributes.leader.value;
        nationAbb = cellsArr[n].attributes.nationAbb.value;

        let imgLink = 'img/nations/'+ nationAbb +'.png';
        let str;
        if(leaderName.search(" ") != -1){
          let a = leaderName.slice(0, leaderName.search(" "));
          str = a + ' | ' + nation;
        }else{
          str = leaderName + ' | ' + nation;
        };
        document.getElementById("result").children[k].append(playerBlockNationItem.cloneNode(true));
        document.getElementById("result").children[k].children[i].children[0].setAttribute("src", imgLink);
        document.getElementById("result").children[k].children[i].children[1].innerText = str;
        if(i == 3){
          textForClipboard = textForClipboard + str + "\n ";
        }else{
          textForClipboard = textForClipboard + str + '   /   ';
        }
        n++;
      };
    }
    navigator.clipboard.writeText(textForClipboard);
  };
  draftTableCreate();
};
