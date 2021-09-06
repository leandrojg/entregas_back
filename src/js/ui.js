// En este archivo tenemos funciones para pintar, sacar, añadir etc en la pantalla 

const notesList = document.querySelector('#notes')

//Esta constante guarda la nota que he seleccionado. 
let savedId = "";

//solo retorna un elemento div con todos sus eventos interfaz etc... 
const noteUI = note => {

    const div = document.createElement('div')

    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInRight">
        <div class="d-flex justify-content-between" >
            <h1 class="h3 card-title"> ${note.title} </h1>
            <div>
                <button class="btn btn-danger delete" data-id="${note.id}"> Delete</button>
                <button class="btn btn-secondary update" data-id=${note.id}> Update</button>
            </div>
        </div>
        <p>${note.description}</p>
    </div>
    `;

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', () => {
        deleteNote(btnDelete.dataset.id)
    });

    btnUpdate.addEventListener('click', () =>{
        getNote(btnUpdate.dataset.id)
    });

    return div
}

//Con esta idea pinta todo el arreglo de nuevo cuando se refresca la pantalla
const renderNotes = (notes) => {
    notesList.innerHTML = "";
    notes.forEach(note => {
        notesList.append(noteUI(note))
    });
};

//crea una nueva nota
const appendNote = note => {
    console.log("llego")
    notesList.append(noteUI(note))
}