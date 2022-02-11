const tablePosts = document.querySelector('.table-posts')
if (tablePosts){
    tablePosts.addEventListener('click', e => {

        if (e.target.hasAttribute('data-id')) {
            if (e.target.classList.contains('btn-edit')) {
                //edit
                const id = e.target.getAttribute('data-id')

            } else if (e.target.classList.contains('btn-delete')) {
                //delete
                const id = e.target.getAttribute('data-id')
                console.log('delete')
                if (id) {
                    fetch(`/posts/${id}`, {
                        method: 'DELETE',
                    })
                        .then(()=>{
                            if (location.pathname === '/post'){
                                window.location.reload()
                            } else {
                                window.location.href = '/posts'
                            }
                        })
                }
            }
        }
    })
}
