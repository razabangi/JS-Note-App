showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
    let addText = document.getElementById('addText');
    [notes, noteObj] = getNotes();
    noteObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addText.value = "";

    showNotes();
});

function showNotes() {
    [notes, noteObj] = getNotes();
    let showDiv = document.getElementById('notes');
    let html = "";
    noteObj.forEach((element, index) => {
        html += `<div class="card cardNote mx-2 my-2" style="width: 21rem;">
            <div class="card-body">
              <h5 class="card-title">${element}</h5>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Remove Note</button>
            </div>
        </div>`;
    });
    if (noteObj.length != 0) {
        showDiv.innerHTML = html;
    } else {
        showDiv.innerHTML = `<b>Notes not found!</b>`;
    }
}

function getNotes() {
    let notes = localStorage.getItem("notes");
    if (notes != null) {
        noteObj = JSON.parse(notes);
    } else {
        noteObj = [];
    }
    return [notes, noteObj];
}

function deleteNote(index) {
    [notes, noteObj] = getNotes();
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();
}

let searchText = document.getElementById('searchText');
searchText.addEventListener('input', () => {
    let inputValue = searchText.value;
    let cardNote = document.getElementsByClassName('cardNote');
    Array.from(cardNote).forEach((element) =>  {
        let tags = element.getElementsByTagName('h5')[0].innerHTML;
        if (tags.includes(inputValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
