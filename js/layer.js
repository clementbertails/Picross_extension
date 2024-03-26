function getKey_top() {
    let key_top = document.getElementsByClassName('key top');
    let key_top_values = [];
    for (let i = 0; i < key_top.length; i++) {
        let sum = 0;
        let len = 0;
        key_top[i].innerHTML.replace(/<\/?em>/g, "").split("<br>").forEach(function (item) {
            len ++;
            sum += parseInt(item);
        });
        key_top_values.push(sum + len - 1);
    }
    return key_top, key_top_values;
}

function getKey_left() {
    let key_left = document.getElementsByClassName('key left');
    let key_left_values = [];
    for (let i = 0; i < key_left.length; i++) {
        let sum = 0;
        let len = 0;
        key_left[i].innerHTML.replace(/<\/?em>/g, "").split("&nbsp;").forEach(function (item) {
            len ++;
            sum += parseInt(item);
        });
        key_left_values.push(sum + len - 1);
    }
    return key_left, key_left_values;
}

function displayRightLayer(key_left_values) {

    let grid = document.getElementById('puzzle').querySelector('tbody');
    let grid_nbrows = parseInt(localStorage.getItem('picross.dimensionHeight').replace('"', ''));

    for (let i = 0; i < grid_nbrows; i++) {
        let row = grid.rows[i + 1];
      
        let cell = document.createElement('td');
        cell.className = 'key';
        cell.innerHTML = key_left_values[i];
        cell.style = "vertical-align: middle; padding-top: 2px; padding-bottom: 2px; padding-left: 2px";
        row.appendChild(cell);
    }
}

function displayBottomLayer(key_top_values) {

    let grid = document.getElementById('puzzle').querySelector('tbody');
    let grid_nbcols = parseInt(localStorage.getItem('picross.dimensionWidth').replace('"', ''));

    let new_row = grid.appendChild(document.createElement('tr'));
    new_row.appendChild(document.createElement('td')).className = 'key';
    for(var i = 0; i < grid_nbcols; i++) {
        let cell = document.createElement('td');
        cell.className = 'key';
        cell.innerHTML = key_top_values[i];
        cell.style = "text-align: center; padding-left: 2px; padding-right: 2px; padding-top: 2px";
        new_row.appendChild(cell);
    }
}

function clearLayers() {
    let grid = document.getElementById('puzzle').querySelector('tbody');
    let grid_nbrows = parseInt(localStorage.getItem('picross.dimensionHeight').replace('"', ''));
    let grid_nbcols = parseInt(localStorage.getItem('picross.dimensionWidth').replace('"', ''));

    // right layer clear
    while(grid.rows.length > grid_nbrows + 1) {
        grid.removeChild(grid.lastChild);
    }

    // bottom layer clear
    while(grid.rows[1].childElementCount > grid_nbcols + 1) {
        for (let i = 0; i < grid_nbrows; i++) {
            let row = grid.rows[i + 1]
            row.removeChild(row.lastChild);
        }
    }


}

function layers_help_col(key, col) {

}

function layers_help_row(key, row) {

}

function createLayers() {

    let key_top, key_top_values = getKey_top();
    let key_left, key_left_values = getKey_left();

    clearLayers();
    displayBottomLayer(key_top_values);
    displayRightLayer(key_left_values);

        // const isSuperior = (nb) => parseInt(nb) > (grid_nbrows - ky_top_values[i]);

        // actual_key_top = key_top[i].innerHTML.replace(/<\/?em>/g, "").split("<br>");
        // if (actual_key_top.some(isSuperior)) {
        //     layers_help_col(actual_key_top, i);
        // }
        
}

function layer_solution() {
    let solution = localStorage.getItem('picross.solution');
    let grid = document.getElementById('puzzle').querySelector('tbody');
    let grid_nbrows = parseInt(localStorage.getItem('picross.dimensionHeight').replace('"', ''));
    let grid_nbcols = parseInt(localStorage.getItem('picross.dimensionWidth').replace('"', ''));

    let solution_grid = solution.split("\n");
    for (let i = 0; i < grid_nbrows; i++) {
        let row = grid.rows[i + 1];
        for (let j = 0; j < grid_nbcols; j++) {
            let cell = row.cells[j + 1];
            cell.className = solution_grid[i][j] == '1' ? 'cell on' : 'cell off';
        }
    }

}

function create_eventsListeners() {
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
        elements.forEach(element => {
            if (element.id === "new" || element.id === "customGame") {
                element.addEventListener(event, () => {
                    console.log("new game");
                    setTimeout(() => {
                        createLayers();
                    }, 50);
                });
            } else {
                element.addEventListener(event, () => {
                    createLayers();
                });
            }
        });
    });
}

document.onload = createLayers();
    
create_eventsListeners();

// remove overflow hidden
const containerElements = document.getElementsByClassName('container');
for (let i = 0; i < containerElements.length; i++) {
    const container = containerElements[i];
    container.style.overflow = "visible";
}

// Create the solution button
const solution = document.createElement('button');
solution.id = "solution";
solution.innerHTML = "Solution";
solution.addEventListener('click', layer_solution);

const controlSolution = document.createElement('div');
controlSolution.className = "control-group";
controlSolution.appendChild(solution);

document.getElementsByClassName('controls')[0].appendChild(controlSolution);