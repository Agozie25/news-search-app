
const apiKey = '43b6091e5f3c4447a0d0ae7e56ad608b'

const blogContainer = document.getElementById('blog-container')

// (async function fetchRandomNews(){
//  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`)

//  if(response.status === 404){
//    blogContainer.style.display = 'block'
//  }else{
//     let data = await response.json()
//     console.log(data)
//  }

//  document.querySelector('.img').innerHTML = data.articles.urlToImage
//  document.querySelector('.title').innerHTML = data.articles.title
//  document.querySelector('.description').innerHTML = data.description
// })();


const searchField = document.getElementById('search-input')
const searchbutton = document.getElementById('search-button')

searchbutton.addEventListener('click', async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log('error searching new',error)
        }
    }
})



async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        // console.log(data)
        return data.articles;

    }catch(error){
        console.error("error fetching random",error)
    }
}

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        console.log(data)
        return data.articles;

    }catch(error){
        console.error("error fetching random",error)
        return[]
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = ""
   articles.forEach((article)=>{
    const blogCard = document.createElement("div")
        blogCard.classList.add('blog-card')
        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt=article.title
        const title =document.createElement('h2')
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+ '...':article.title
        title.textContent=truncatedTitle
        const description = document.createElement('p')
        const truncatedDes = article.description.length > 120 ? article.title.slice(0,120)+ '...' : article.description
        description.textContent= truncatedDes

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click',()=>{
            window.open(article.url,'_blank')
        })
        blogContainer.appendChild(blogCard)
   })
}

(async ()=>{
    try {
        const articles = await fetchRandomNews()
        displayBlogs(articles)
    }catch(error){
        console.error('error fetching',error)
    }
})();

