const tablePosts = document.querySelector('.table-posts')
if (tablePosts){
    tablePosts.addEventListener('click', e => {

        if (e.target.hasAttribute('data-id')) {
            if (e.target.classList.contains('btn-edit')) {
                //edit
                const id = e.target.getAttribute('data-id')
                console.log('edit')
                window.location.href = `/edit/${id}`
            } else if (e.target.classList.contains('btn-delete')) {
                //delete
                const id = e.target.getAttribute('data-id')
                console.log('delete')
                if (id) {
                    fetch(`/post/${id}`, {
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

const navbar = document.querySelectorAll('.collapse.navbar-collapse ul li a')
if (navbar){
    navbar.forEach((item, i) => {
        if (location.pathname === item.getAttribute('href')){
            item.classList.add('active')
        }
    })
}