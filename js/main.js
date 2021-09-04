//ESTE ES EL CLIENTE


const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');


noteForm.addEventListener('submit', e => {
    e.preventDefault();
    
    if(savedId){
        updateNote(savedId, title.value, description.value);//si existe lo actualizamos con el id
    }else{
        saveNote(title.value, description.value); //caso contrario lo guardo
    }    

    title.value = "";
    description.value = "";

    title.focus();
    
});