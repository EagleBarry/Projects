let letters = ["A","B","C","D","E","F","G","H","I","J"];

for (let i = 0; i < letters.length; i++) {
    var table = document.getElementById("table");
    var data = document.createElement("TR")
    data.id = "Row "+ letters[i];
    table.appendChild(data);
    var row = document.getElementById("Row " + letters[i]);
    var indexData = document.createElement("TD");
    indexData.innerText = letters[i];
    row.appendChild(indexData)
    var arr = new Array(10);
    for (let j = 0; j < 10; j++) {                  
        arr[j] = new Array(1);
        for (let k = 0; k < arr.length; k++) {
            arr[j][k] = '.';
            var td = document.createElement("TD");
            td.id = i + "" + j;
            var text = document.createTextNode(arr[j][k]);
            td.appendChild(text);
        }
        row.appendChild(td);
    }
}