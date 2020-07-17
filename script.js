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
    .forEach((person, index) => { //personは人の名前、indexは配列の0, 1
        const listItem = document.createElement('li');

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
}