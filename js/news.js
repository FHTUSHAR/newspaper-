const loadData = () => {

    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => showNewsCaegory(data.data.news_category))
        .catch(e => console.log(e))
}
const showNewsCaegory = (categories) => {

    const news_category = document.getElementById('news_category');
    // console.log(categories)
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('news_category')
        categoryDiv.innerHTML = `
    <h6 onclick="categoricalDataId(${category.category_id},'${category.category_name}')" class="ms-5 fs-6">${category.category_name}</h6>
    `
        news_category.appendChild(categoryDiv);
    });
}
const categoricalDataId = (id, category_name) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data, category_name))
        .catch(e => console.log(e))

}
const displayNewsDetails = (newses, category_name) => {
    console.log(newses)
    newses = newses.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const message = document.getElementById('message');
    const newsLength = document.getElementById('newsLength');
    newsLength.innerHTML = `
    <h2 class="bg-secondary mb-2 px-4 text-white py-2">${newses.length} item found for category ${category_name}</h2>
    `
    if (newses.length == 0) {
        message.classList.remove('d-none')
    }
    else {
        message.classList.add('d-none')
    }
    //console.log(newses)
    const news_container = document.getElementById('news-container');
    news_container.innerHTML = ``;
    newses.forEach(news => {
        const newsContainerDiv = document.createElement('div');
        newsContainerDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 940px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 200)}...</p>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <div>
                                 <img class="img rounded-5" src="${news.author.img ? news.author.img : "No Data Found"}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div>
                                <h6>${news.author.name ? news.author.name : 'No Data Found'}</h6>
                                <h6>${news.author.published_date ? news.author.published_date.slice(0, 10) : "No Data Found"}</h6>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6> <img src="images/eye.svg" alt=""> ${news.total_view ? news.total_view : 'No Views'}</h6>
                        </div>
                        <div class="mt-2">
                        <button onclick="newsID('${news._id}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#newsModal"> Details</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        news_container.appendChild(newsContainerDiv);
    })
    loadingSpiner(false);

}
const newsID = (news_id) => {
    // console.log(news_id)
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => newsModal(data.data[0]))
        .catch(e => console.log(e))
}
const newsModal = (news_details) => {
    // console.log(news_details);
    document.getElementById('newsModal').innerHTML = `
    <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newsModalLabel">${news_details.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="card" style="width: 28rem;">
                    <img src="${news_details.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">${news_details.details}</p>
                    </div>
                  </div>
                    </div>
                    
                    <div class="d-flex justify-content-between px-5 py-2">
                    <div class="d-flex">
                        <div>
                             <img class="img rounded-5" src="${news_details.author.img ? news_details.author.img : "No Data Found"}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div>
                            <h6>${news_details.author.name ? news_details.author.name : 'No Data Found'}</h6>
                            <h6>${news_details.author.published_date ? news_details.author.published_date.slice(0, 10) : "No Data Found"}</h6>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h6> <img src="images/eye.svg" alt=""> ${news_details.total_view ? news_details.total_view : 'No Views'}</h6>
                    </div>
                </div>
                        
                    </div>
                </div>
            
    
    `;
}
const loadingSpiner = (isLoadding) => {
    const loading = document.getElementById('loadSpinner');
    if (isLoadding) {
        loading.classList.remove('d-none')
    }
    else {
        loading.classList.add('d-none')
    }
}

loadData();
categoricalDataId(01, 'Breaking News');
loadingSpiner(true);
