let myLibrary = [];
const modal_add = document.querySelector("#new_book");
id_input = document.getElementById("bookId");
title_input = document.getElementById("bookName");
author_input = document.getElementById("bookAuthor");
year_input = document.getElementById("bookYear");
pages_total_input = document.getElementById("bookPages");
pages_read_input = document.getElementById("bookReadPages");
reading_status_input = document.getElementById("readStatus");

//Book Constructor
function Book(title, author, year, pages_total, pages_read, reading_status) {
  id = myLibrary.length;
  this.id = id;
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages_total = pages_total;
  this.pages_read = pages_read;
  this.reading_status = reading_status;
}

//Function to create new book, add book to Library array and show the card
function addBookToLibrary(
  title,
  author,
  year,
  pages_total,
  pages_read,
  reading_status
) {
  let book = new Book(
    title,
    author,
    year,
    pages_total,
    pages_read,
    reading_status
  );
  myLibrary.push(book);
  createCard(book);
  let card = document.getElementById(`card-${book.id}`);
  let buttonEdit = card.querySelector(".btn-edit");
  let buttonDelete = card.querySelector(".btn-delete");
  buttonDelete.addEventListener("click", () => {
    let confirmation = confirm("Do you really want to delete this book?");
    if (confirmation === true) deleteCard(card);
  });
  buttonEdit.addEventListener("click", () => {
 
    id_input.value=book.id.toString().replace('-','');
    title_input.value=book.title;
    author_input.value=book.author;
    year_input.value=book.year;
    pages_total_input.value=book.pages_total;
    pages_read_input.value=book.pages_read;
    reading_status_input.value=book.reading_status;
    openModal(modal_add);
  });
}

//Function to create new cards adding to page
function createCard(object) {
  const cards = document.querySelector(".cards");

  id = object.id;
  title = object.title;
  author = object.author;
  year = object.year;
  pages_total = object.pages_total;
  pages_read = object.pages_read;
  reading_status = object.reading_status;
  card = `
    <div class="card" id='card-${id}'>
        <div class="card-header">
            <span class='bookCard_title'  data-title-${id}></span>
        </div>
        <div class="card-body">
            <span class='bookCard_infos' data-id-${id} hidden><strong></strong></span>
            <span class='bookCard_infos' ><strong>Author:</strong> <span data-author-${id}></span></span>
            <span class='bookCard_infos' ><strong>Year:</strong><span data-year-${id}></span></span>
            <span class='bookCard_infos'><strong>Pages (read/total):</strong><span data-pagesread-${id}>   </span>/ <span data-pages_total-${id}></span></span>
            <span class='bookCard_infos'><strong>Book Status:</strong><span data-status-${id}></span></span>
        </div>
        <div class="card-footer">
            <button type="button" class="btn-delete" data-delete-button  >Delete</button>
            <button type="button" class="btn-edit" data-edit-button>Edit</button>
        </div>
    </div>
    `;
  cards.insertAdjacentHTML("afterbegin", card);

  // add variable to fields separated from innerhtml to avoid XSS)
  const titleInsert = document.querySelector(`[data-title-${id}]`);
  const idInsert = document.querySelector(`[data-id-${id}]`);
  const authorInsert = document.querySelector(`[data-author-${id}]`);
  const yearInsert = document.querySelector(`[data-year-${id}]`);
  const pagesReadInsert = document.querySelector(`[data-pagesread-${id}]`);
  const pagesTotalInsert = document.querySelector(`[data-pages_total-${id}]`);
  const bookStatusInsert = document.querySelector(`[data-status-${id}]`);

  titleInsert.innerText = title;
  idInsert.innerText = id;
  authorInsert.innerText = author;
  yearInsert.innerText = year;
  pagesReadInsert.innerText = pages_total;
  pagesTotalInsert.innerText = pages_read;
  bookStatusInsert.innerText = reading_status;
}

// deletes Card with fadeOut
function deleteCard(card) {
  if (!card.classList.contains("disabled")) {
    card.classList.toggle("disabled");

    card.addEventListener("webkitAnimationEnd", function () {
     id=card.id.replace('-','').replace('card','');
     myLibrary.splice(myLibrary[id],1)
     card.remove();
    });
  }
}

//send form - New Book or Edit book
function sendForm(){
    const title = title_input.value;
    const author = author_input.value;
    const year = year_input.value;
    const pages_total = pages_total_input.value;
    const pages_read = pages_read_input.value;
    const reading_status = reading_status_input.value;
    //get inputs
      if (id_input.value=='' ){
          if(title_input.value!='' && author_input.value!='' &&year_input.value!='' &&pages_total_input.value!='' &&pages_read_input.value!=''){
            addBookToLibrary(title,author,year,pages_total,pages_read,reading_status);
            clearCard()
            closeModal(modal_add);
          }
       else{
           alert('Please, complete all the fields!')
       }
      }
      else{
        console.log(id_input.value)
        const card=document.querySelector(`#card-${id_input.value}`)
        editCard(id_input.value,card,title,author,year,pages_total,pages_read,reading_status);
        editObject(id_input.value,title,author,year,pages_total,pages_read,reading_status)
      }
}

// Clear the Card
function clearCard(){
    title_input.value='';
    author_input.value='';
    year_input.value='';
    pages_total_input.value='';
    pages_read_input.value='';
    reading_status_input.value='';
}

//Edit card values
function editCard(id,card,title,author,year,pages_total,pages_read,reading_status){
    card.querySelector(`[data-title-${id}]`).innerText=title;
    card.querySelector(`[data-author-${id}]`).innerText=author;
    card.querySelector(`[data-year-${id}]`).innerText=year;
    card.querySelector(`[data-pagesread-${id}]`).innerText=pages_read;
    card.querySelector(`[data-pages_total-${id}]`).innerText=pages_total;
    card.querySelector(`[data-status-${id}]`).innerText=reading_status;
    closeModal(modal_add)

}

//Edit object based on Array Index
function editObject(index,title,author,year,pages_total,pages_read,reading_status){
myLibrary[index].title=title;
myLibrary[index].author=author;
myLibrary[index].year=year;
myLibrary[index].pages_total=pages_total;
myLibrary[index].pages_read=pages_read;
myLibrary[index].reading_status=reading_status;
}

// Update Read Status based on total pages and read pages
function updateReadStatus(){
   let totalPages=pages_total_input.value;
   let readPages=pages_read_input.value;


   if(totalPages=='' || readPages=='') return
   else if(totalPages==0) {
       alert('Total Pages cannot be 0'); 
       pages_total_input.value=''
    }
   else if(totalPages< readPages){
       alert('Total Pages cannot be smaller than Read Pages')
       this.value='';
   }else if(totalPages==readPages) {
    reading_status_input.value='Complete'
    }
   else if(totalPages!=0 && readPages==0 ) {reading_status_input.value='Not Started'}
   else  {reading_status_input.value='Reading'}

}

//defines action of send button
button_send = document.getElementById("send_form");
button_send.addEventListener("click", sendForm);

//defines action when changing pages
bookReadPagesInput = document.getElementById("bookReadPages");
console.log(bookReadPagesInput);
bookTotalPagesInput = document.getElementById("bookPages");
bookReadPagesInput.addEventListener("change", updateReadStatus);
bookTotalPagesInput.addEventListener("change",updateReadStatus);

//INITIAL TEST LOAD
addBookToLibrary("The Hobbit", "SJ Simpson", "1992", "400", "210", "Reading");
addBookToLibrary("The Lord of the Rings v1", "J.R.R. Tolkien", "1968", "1137", "1137", "Complete");
