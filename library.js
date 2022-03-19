// Write your code here!
//R0ll-1906594
//Name-Souvik Mondal
let logMessage = document.getElementById("logged-in-user-name");
const loginField = document.getElementById("logged-user");
const myTable = document.getElementById("info-table");
const users = ["UserA", "UserB", "UserC", "UserD"];
let user = '';
let statusCheck = 0;
let c = 0;

const bookClub = [{
    id: 1,
    name: "Book1",
    author: "Author1",
    lender: "UserC",
    borrower: "UserB",
    action: ""
  },
  {
    id: 2,
    name: "Book2",
    author: "Author2",
    lender: "UserC",
    borrower: "",
    action: ""
  },
  {
    id: 3,
    name: "Book3",
    author: "Author3",
    lender: "UserD",
    borrower: "UserC",
    action: ""
  },
  {
    id: 4,
    name: "Book4",
    author: "Author4",
    lender: "UserA",
    borrower: "",
    action: ""
  },
  {
    id: 5,
    name: "Book5",
    author: "Author5",
    lender: "UserA",
    borrower: "",
    action: ""
  },
  {
    id: 6,
    name: "Book6",
    author: "Author6",
    lender: "UserB",
    borrower: "UserA",
    action: ""
  }
];
bookClub.forEach(book => {
  let row = document.createElement('tr');
  Object.values(book).forEach(text => {
    let cell = document.createElement('td');
    let textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    row.appendChild(cell);
  })
  myTable.appendChild(row);
});

logMessage.innerHTML = "<h4>No user logged in</h4>";

function changeLoggedInUser() {
  const username = loginField.value;
  if (users.includes(username)) {
    if (statusCheck === 1) {
      for (let i = 1; i < myTable.rows.length - 1; i++) {
        row = myTable.rows[i];
        row.cells[5].innerHTML = "";
      }
      myTable.deleteRow(myTable.rows.length - 1);
    }
    logMessage.innerHTML = "<h4>Logged in user: " + username+"</h4>";
    user = username;
    statusCheck = 1;
    c = 0;
    addRow(user);
  } else if (!users.includes(username) || username === "") {
    logMessage.innerHTML = "<h4>Invalid username</h4>";
    statusCheck = 0;
    c = c + 1;
    for (let i = 1; i < myTable.rows.length - 1; i++) {
      row = myTable.rows[i];
      row.cells[5].innerHTML = "";
    }
    if (c < 2 && bookClub.length > 6) {
      myTable.deleteRow(myTable.rows.length - 1)
    }
  }
}

function addRow(user) {
  myTable.insertRow(bookClub.length + 1).innerHTML = `<tr>
    <td></td>
    <td><input type="text" id="newTitle" placeholder="Title" required onkeyup="isEmpty()"></input></td>
    <td><input type="text" id="newAuthor" placeholder="Author" required onkeyup="isEmpty()"></input></td>
    <td>${user}</td>
    <td></td>
    <td><button id="btn" disabled type="button" onclick="insertNew(user)">Add</button></td>
    </tr>`

  login()
}

function isEmpty() {
  let title = document.getElementById("newTitle").value;
  let author = document.getElementById("newAuthor").value;

  if (title != "" && author != "") {
    document.getElementById("btn").removeAttribute("disabled");
  }

}

function insertNew(userLogged) {
  let titleName = document.getElementById("newTitle");
  let authorName = document.getElementById("newAuthor");
  bookClub.push({
    id: bookClub.length,
    name: titleName.value,
    author: authorName.value,
    lender: userLogged,
    borrower: "",
    action: ""
  })
  let row = myTable.insertRow(bookClub.length);

  let id = row.insertCell(0);
  id.innerHTML = bookClub.length;

  let name = row.insertCell(1);
  name.innerHTML = titleName.value;

  let author = row.insertCell(2);
  author.innerHTML = authorName.value;

  let lender = row.insertCell(3);
  lender.innerHTML = userLogged;

  let borrower = row.insertCell(4);
  borrower.innerHTML = "";

  let action = row.insertCell(5);

  const inputs = document.querySelectorAll('#newTitle, #newAuthor');

  inputs.forEach(input => {
    input.value = '';
  });
  document.getElementById("btn").setAttribute("disabled", "");
}

function login() {
  for (let i = 1; i < myTable.rows.length; i++) {
    let row = myTable.rows[i];
    if (bookClub[i - 1].lender !== user && bookClub[i - 1].borrower === "") {
      row.cells[5].innerHTML = `<button onclick="borrow(${i})">Borrow</button>`
    } else if (bookClub[i - 1].lender !== user && bookClub[i - 1].borrower === user) {
      row.cells[5].innerHTML = `<button onclick="returning(${i})">Return</button>`
    }
  }
}

function borrow(rowNo) {
  let row = myTable.rows[rowNo];
  row.cells[5].innerHTML = `<button onclick="returning(${rowNo})">Return</button>`
  row.cells[4].innerHTML = user;
  bookClub[rowNo - 1].borrower = user;
}

function returning(rowNo) {
  let row = myTable.rows[rowNo];
  row.cells[5].innerHTML = `<button onclick="borrow(${rowNo})">Borrow</button>`
  row.cells[4].innerHTML = "";
  bookClub[rowNo - 1].borrower = "";
}
