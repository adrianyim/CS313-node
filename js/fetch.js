// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//     return parent.append(el);
// }

const output = document.getElementById("output");
const url = "https://adrianyim-node.herokuapp.com/selectItems";

// fetch(url)
// .then((res) => res.json())
// .then((data) => {
// let items = data.results;
// return items.map((row) => {
//     let li = createNode("li"),
//         span = createNode("span");
//     span.innerHTML = `${row.item} ${row.item_type} ${row.remark}`;
//     append(li, span);
//     append(output, li);
// })
// })
// .catch((error) => {
// console.log(error);
// });

fetch(url)
.then(res => {
    res.json().then(json => {
        // let items = json.map(json => json.item);
        // console.log(json);

        output.innerHTML = `<table>
        <tr><th>Item</th><th>Item Type</th><th>Cost</th><th>Cost Type</th><th>Remark</th><th>Date</th></tr>` + drawTable(json) + `</table>`;

        // output.innerHTML = drawTable(json);
    });
})
.catch((error) => {
console.log(error);
});

function drawTable(json) {
    let row = json.map(rows => `<tr><td>${rows.item}</td><td>${rows.item_type}</td><td>${rows.cost}</td><td>${rows.cost_type}</td><td>${rows.remark}</td><td>${rows.date}</td><td><a href="/updateItem?id=${rows.item_id}">Update</a></td><td><a href="/deleteItems/${rows.item_id}">Delete</a></td></tr>`).join("\n");



    return `${row}`;
}


{/* <ul>
      <% videodata.categories.forEach(function(item){ %>
          <li><a href="/video?id=<%= item.categoryID %>"><%= item.categoryName %></a></li>
      <% });%>
    </ul> */}