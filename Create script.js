let books = JSON.parse(localStorage.getItem("books")) || [];

displayBooks();

function addBook(){

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;

    if(title==="" || author===""){
        alert("Please enter all details");
        return;
    }

    books.push({
        title:title,
        author:author,
        borrowed:false
    });

    saveBooks();

    document.getElementById("title").value="";
    document.getElementById("author").value="";

    displayBooks();
}

function displayBooks(){

    let list=document.getElementById("bookList");

    list.innerHTML="";

    books.forEach((book,index)=>{

        list.innerHTML+=`
        <div class="book">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Status: ${book.borrowed ? "Borrowed" : "Available"}</p>

            <button onclick="toggleBorrow(${index})">
            ${book.borrowed ? "Return" : "Borrow"}
            </button>

            <button onclick="deleteBook(${index})">
            Delete
            </button>
        </div>
        `;
    });

}

function deleteBook(index){
    books.splice(index,1);
    saveBooks();
    displayBooks();
}

function toggleBorrow(index){
    books[index].borrowed=!books[index].borrowed;
    saveBooks();
    displayBooks();
}

function searchBook(){

    let keyword=document.getElementById("search").value.toLowerCase();

    let filtered=books.filter(book=>
        book.title.toLowerCase().includes(keyword)
    );

    let list=document.getElementById("bookList");
    list.innerHTML="";

    filtered.forEach((book,index)=>{

        list.innerHTML+=`
        <div class="book">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.borrowed ? "Borrowed":"Available"}</p>
        </div>
        `;
    });

}

function saveBooks(){
    localStorage.setItem("books",JSON.stringify(books));
}
