const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text: text,
    done: false
  };

  this.reset();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map( (plate, i) => {
    return `<li>
              <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done === true ? 'checked' : ''} />
              <label for="item${i}">${plate.text}</label>
            </li>
            `;
  }).join('');
}

function toggleDone(e){
  if (!e.target.matches('input')) {
    return;
  }
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items));
}

function clearAll() {
  items = [];
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function clearChecked() {
  items = items.filter(item => item.done === false);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

  addItems.addEventListener('submit', addItem )
  itemsList.addEventListener('click', toggleDone)
  populateList(items, itemsList);
