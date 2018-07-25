export function deleteRecordFromJsonServer(e) {
    console.log(e)
    if (e.target.classList.contains('archive')) {

        const array = Array.from(e.target.classList);
        const id = array[5].substring(4);

        delete_item(id);
    }
}

const delete_item = (id) => {
    jQuery.ajax({
        url: 'http://localhost:3000/cards/' + id,
        type: 'DELETE',
        success: function (data) {
            console.log(data);
        }
    });
}