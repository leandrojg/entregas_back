//Este archivo guarda las conexiones de webSocket

const socket = io();

/** JS DOC --> AYUDA A DOCUMENTAR
 * Esto guarda una nueva nota
 * @param {string} title  //note title
 * @param {string} description  //note description
 */

const saveNote = (title, description) => {

    //para guardar una nueva nota
    socket.emit('client:newnote', { 
        title: title,
        description: description,
    });
    };

    const deleteNote  = id => {
        socket.emit('client:deletenote', id)
    }

    const getNote = (id) => {
        socket.emit('client:getnote', id)
    }


    const updateNote = (id, title, description) => {
        socket.emit('client:updatenote', { 
            id, 
            title, 
            description
        })
    }

    //escucha cunado una nota sea añadida
    socket.on('server:newnote', appendNote);

    socket.on('server:loadnotes', renderNotes);

    socket.on('server:selectednote', note => {  /// VERIFICAR
        const title = document.querySelector('#title');
        const description = document.querySelector('#description');

        title.value = note.title;
        description.value = note.description;

        savedId = note.id;
    })