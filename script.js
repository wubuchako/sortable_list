const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

//Store listitems
const listItems = [

];

let dragStartIndex;

createList();

//Insert list items into DOM
function createList(){
    [...richestPeople] //richestPeopleのarrayを全てコピー
    .map(a => ({ value: a, sort: Math.random()})) //sortしてランダムに数出して新たな配列作る。
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => { //personは人の名前、indexは配列の0, 1
        console.log(person);
        const listItem = document.createElement('li');

        listItem.classList.add('wrong');

        listItem.setAttribute('data-index', index);//data-indexのattributeつける index配列の0-9

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true"> 
         <p class="person-name">${person}</p>
         <i class="fas fa-grip-lines"></i>
        </div>
        `;    //indexに１を足すことで0-9表せる。draggable=trueでクリックしたらドラッグできる。
    
        listItems.push(listItem); //liのとことに上のものが入る。

        draggable_list.appendChild(listItem);//liをulに入れる。DOMに入れる。
    });

    addEventListeners();
}

function dragStart(){
 //console.log('Event: ', 'dragstart');
 dragStartIndex = +this.closest('li').getAttribute('data-index');//dragするアイテムの番号が出る
}

function dragEnter(){
 //console.log('Event: ', 'dragenter');
 this.classList.add('over');
}

function dragLeave(){
 //console.log('Event: ', 'dragleave'); 
 this.classList.remove('over');  
}

function dragOver(e){
 //console.log('Event: ', 'dragover');
 e.preventDefault();   //初期設定の動きを防ぐ
}

function dragDrop(){
 //console.log('Event: ', 'drop'); 
 const dragEndIndex = +this.getAttribute('data-index');
 swapItems(dragStartIndex, dragEndIndex);

 this.classList.remove('over');
}

//Swap list items that are dag and drop
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//Check the order of list items
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}


function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);

    });
}

check.addEventListener('click', checkOrder);