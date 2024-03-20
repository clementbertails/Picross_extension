function createLayer() {

    let key_top = document.getElementsByClassName('key top');
    let key_left = document.getElementsByClassName('key left');

    let key_top_values = [];
    let key_left_values = [];

    for (let i = 0; i < key_top.length; i++) {
        let sum = 0;
        let len = 0;
        key_top[i].innerHTML.replace(/<\/?em>/g, "").split("<br>").forEach(function (item) {
            len ++;
            sum += parseInt(item);
        });
        key_top_values.push(sum + len - 1);
    }

    for (let i = 0; i < key_left.length; i++) {
        let sum = 0;
        let len = 0;
        key_left[i].innerHTML.replace(/<\/?em>/g, "").split("&nbsp;").forEach(function (item) {
            len ++;
            sum += parseInt(item);
        });
        key_left_values.push(sum + len - 1);
    }

    let grid = document.getElementById('puzzle').querySelector('tbody');
    let grid_nbrows = parseInt(localStorage.getItem('picross.dimensionHeight').replace('"', ''));
    let grid_nbcols = parseInt(localStorage.getItem('picross.dimensionWidth').replace('"', ''));

    while(grid.rows.length > grid_nbrows + 1) {
        grid.removeChild(grid.lastChild);
    }

    while(grid.rows[1].childElementCount > grid_nbcols + 1) {
        for (let i = 0; i < grid_nbrows; i++) {
            let row = grid.rows[i + 1]
            row.removeChild(row.lastChild);
        }
    }

    for (let i = 0; i < grid_nbrows; i++) {
        let row = grid.rows[i + 1];
      
        let cell = document.createElement('td');
        cell.className = 'key';
        cell.innerHTML = key_left_values[i];
        cell.style = "text-align: left";
        cell.style = "vertical-align: middle";
        row.appendChild(cell);
    }

    let new_row = grid.appendChild(document.createElement('tr'));
    new_row.appendChild(document.createElement('td')).className = 'key';
    for(var i = 0; i < grid_nbcols; i++) {
        cell = new_row.appendChild(document.createElement('td'));
        cell.className = 'key';
        cell.innerHTML = key_top_values[i];
        cell.style = "text-align: center";
        cell.style = 'paddingTop = "5px"';
    }
}

document.onload = createLayer();

const targets = [
    "click #new",
    "click #customGame",
    "change #dark",
    "change #easy",
    "mousedown",
    "mouseover td.cell",
    "mouseout td.cell",
    "mouseup",
    "touchstart td.cell",
    "touchmove td.cell",
    "touchend td.cell"
];

const defaultTarget = document.body;

targets.forEach(target => {
    const [event, subTarget] = target.split(" ");
    const elements = subTarget ? defaultTarget.querySelectorAll(subTarget) : [ defaultTarget ];

    elements.forEach(element => element.addEventListener(event, createLayer))
});

const containerElements = document.getElementsByClassName('container');
for (let i = 0; i < containerElements.length; i++) {
  const container = containerElements[i];
    container.style.overflow = "visible";
}
