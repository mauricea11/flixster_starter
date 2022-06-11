// const Base_URL = 'https://api.themoviedb.org/3'
// const specifcURL = '/discover/movie?sort_by=popularity.desc/'

const API_KEY = 'd5567b492a89784e91445a8ae0af4345'
var API_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d5567b492a89784e91445a8ae0af4345&language=en'

// Query Selectors
const movieArea = document.querySelector("#movies-grid")
const submitButton = document.querySelector("#submitBtn")
const textBox = document.querySelector("#search-input")
const putMoreMovies = document.querySelector("#loadMore")
let topButton = document.getElementById("backToTop")

async function getMovies(url){

    let data = await fetch(url)
    let jsonData = await data.json()

    console.log(jsonData)
    displayMovies(jsonData)

}

function displayMovies(moveData){

    

    let baseSrc = 'https://image.tmdb.org/t/p/w300/'
    let backDropPath = "/m5dA4JZsj78EBTa2D6imWOAebwB.jpg"
    
    let imgsrc = ''

    
    // Find multiple img url
    let nowShow = document.getElementById("nowPlaying")
    nowShow.innerText = "Top Picks"

    
    for(let i = 0; i < 6; i++){

        let dynamicPath1 = moveData.results[i].poster_path
        imgsrc = baseSrc + dynamicPath1

        topButton.classList.add("hide")

        if(moveData.results[i].poster_path == null){
            movieArea.innerHTML += `
            
            <figure class="movie-card">
                <img src = "https://media.istockphoto.com/vectors/coming-soon-label-vector-id1310496929?k=20&m=1310496929&s=612x612&w=0&h=R6Eo4SKczv5M88DYdMPBsC5eKzXaE379oCUVt01_vXs=" class="movie-poster">

                <figcaption class="movie-title">${moveData.results[i].title}</figcaption>
                <p>Rating: <span class="movie-votes">${moveData.results[i].vote_average}</span></p>
            </figure>
            `
        }
        else{

            movieArea.innerHTML += `
            
            <figure class="movie-card">
                <img src = ${imgsrc} class= "movie-poster">
                
                <figcaption class="movie-title">${moveData.results[i].title}</figcaption>
                <p>Rating: <span class="movie-votes">${moveData.results[i].vote_average}</span></p>
            </figure>
            `
        }
    }
        putMoreMovies.innerHTML = `
        <button id= "load-more-movies-btn">
            Load More Movies
        </button>
        `

    putMoreMovies.addEventListener("click", function(){
        for(let j = 6; j < moveData.results.length; j++){

            if(j == moveData.results.length -1){
                document.getElementById("load-more-movies-btn").remove()
                
                topButton.classList.remove("hide")
                
            }

            let dynamicPath2 = moveData.results[j].poster_path
            imgsrc = baseSrc + dynamicPath2

            if(moveData.results[j].poster_path == null){
                movieArea.innerHTML += `
                
                <figure class="movie-card">
                    <img src = "https://media.istockphoto.com/vectors/coming-soon-label-vector-id1310496929?k=20&m=1310496929&s=612x612&w=0&h=R6Eo4SKczv5M88DYdMPBsC5eKzXaE379oCUVt01_vXs=" class="movie-poster">
    
                    <figcaption class="movie-title">${moveData.results[j].title}</figcaption>
                    <p>Rating: <span class="movie-votes">${moveData.results[j].vote_average}</span></p>
                </figure>
                `
            }
            else{

                movieArea.innerHTML += `
                
                <figure class="movie-card">
                    <img src = ${imgsrc} class= "movie-poster">
                    
                    <figcaption class="movie-title">${moveData.results[j].title}</figcaption>
                    <p>Rating: <span class="movie-votes">${moveData.results[j].vote_average}</span></p>
                </figure>
                `
            }
            console.log(imgsrc)
        }

    })
     
}


function searchMovie(){
    movieArea.innerHTML = ''
    let genericSearchURL = 'https://api.themoviedb.org/3/search/movie?api_key=d5567b492a89784e91445a8ae0af4345&language=en-US&page=1&include_adult=false&query='
    let searchVal = textBox.value
    API_URL = genericSearchURL + searchVal
    getMovies(API_URL)
}

submitButton.addEventListener("click", searchMovie)
