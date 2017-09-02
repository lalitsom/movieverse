var moviedbApiKey = 'aa8b43b8cbce9d1689bef3d0c3087e4d' // themoviedb.org api key
var searchCategory = 'movie'  // category could be movie, person or tv

//  initializing a ajax object to request api
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  var xmlhttpObject = new window.XMLHttpRequest()
} else {
  // code for IE6, IE5
  xmlhttpObject = new window.ActiveXObject('Microsoft.XMLHTTP')
}

//  whenever ajax object get some valid response show it in browser
xmlhttpObject.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    updateList(this.response)
  }
}

//  check if user pressed enter
function getList (kbdEvent) {
  var query = document.getElementById('query_input').value
  if (kbdEvent.code === 'Enter' && query.length > 2) {
    getJsonData(query)
  }
  if (query.length === 0) {
    document.getElementById('result_list').innerHTML = ''
  }
}

//  create and send the query to themoviedb.org
function getJsonData (query) {
  xmlhttpObject.open('GET', 'https://api.themoviedb.org/3/search/' + searchCategory + '?api_key=' + moviedbApiKey +
  '&query=' + query, true)
  xmlhttpObject.send()
}

var jsonObj = ''
function updateList (jsonData) {
  jsonObj = JSON.parse(jsonData)
  var totalResults = jsonObj.total_results
  if (totalResults > 20) {
    totalResults = 20
  }

  var resultList = document.getElementById('result_list')
  var resultStr = ''
  var imgBaseUrl = 'http://image.tmdb.org/t/p/w185/'
  for (let i = 0; i < totalResults; i++) {
    if ((jsonObj.results[i].poster_path || jsonObj.results[i].profile_path) == null) {
      continue
    }
    var imgPath = imgBaseUrl + (jsonObj.results[i].poster_path || jsonObj.results[i].profile_path)
    resultStr += '<li class="movie_element"><img onclick="addToCollage(this)" src=' +
    imgPath + '> <h3>' + (jsonObj.results[i].title || jsonObj.results[i].name) + '</h3></li>'
  }

  resultList.innerHTML = resultStr
}

function setCategory (option) {
  searchCategory = option.dataset.category
  document.getElementById('query_input').placeholder = 'Search ' + option.innerHTML + '...'
  document.getElementById('query_input').value = ''
  document.getElementById('result_list').innerHTML = ''
}

function addToCollage (imgElement) {
  getNextDiv().src = imgElement.src
}

function getNextDiv () {
  var allCollageImg = document.getElementsByClassName('collage-img')
  for (let item of allCollageImg) {
    if (item.src.indexOf('.jpg') === -1) {
      return item
    }
  }
  return allCollageImg[0]
}

function removeFromCollage (imgElement) {
  imgElement.src = ''
}
