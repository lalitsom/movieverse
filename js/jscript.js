moviedb_api_key = "aa8b43b8cbce9d1689bef3d0c3087e4d"; // themoviedb.org api key

//initializing a ajax object to request api
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttpObject = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xmlhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
}


//whenever ajax object get some valid response show it in browser
xmlhttpObject.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateList(this.response);
    }
  }

//create and send the query to themoviedb.org
function get_Json_Data(){
  query = document.getElementById('query_input').value;
  if(query.length<3){
    return 0;
  }
  xmlhttpObject.open("GET","https://api.themoviedb.org/3/search/movie?api_key="+moviedb_api_key+"&query=" +
    query,
    true);
  xmlhttpObject.send();
}

jsonObj ="";
function updateList(jsonData){
    jsonObj = JSON.parse(jsonData);
    total_results = jsonObj.total_results;
    if(total_results>10){
      total_results =10;
    }
    console.log(total_results);
    resultList = document.getElementById('result_list');
    result_str="";
    img_baseurl = "http://image.tmdb.org/t/p/w185/";
    for(let i=0;i<total_results;i++){
      img_path = img_baseurl + jsonObj.results[i].poster_path;
      console.log(img_path);
      result_str += "<li class='movie_element'><img src="+img_path+"> <h3>"+jsonObj.results[i].title+"</h3>"+jsonObj.results[i].overview+"</li>"
    }

    resultList.innerHTML = result_str;
}
