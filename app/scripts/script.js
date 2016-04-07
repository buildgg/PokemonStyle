  var urlListPokemonList = "http://pokeapi.co/api/v1/pokemon/?limit=12";
  var urlSinglePokemon = "http://pokeapi.co/api/v1/pokemon/";

  var nextList;
  var mainURL = "http://pokeapi.co";

function loadDoc(url, cfunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      cfunc(xhttp);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function loadStart(){
    loadDoc(urlListPokemonList, getObjectList);
  }

function getObjectList(xmlhttp) {
    
    var myArr = JSON.parse(xmlhttp.responseText);
    nextList = mainURL +""+myArr.meta.next;
    var arr = myArr.objects;
    getList(arr);
  }

  function getList(arr) {
    var out = "";
    var y = 1;
    var col = 1;
    var type="";

    var typesColor = 
    {
       fire: "OrangeRed",
       poison: "GreenYellow",
       psychic: "Lavender",
       normal:  "RoyalBlue", 
       water: "Coral",
       flying: "Gold",
       bug: "LightCoral",
       electric: "LightSkyBlue",
       ground: "LightSlateGrey",
       fairy: "DarkOrchid",
       grass: "Green ",
       fighting: "DarkSlateGrey",
    }

  document.getElementById("col1").innerHTML = "";
  document.getElementById("col2").innerHTML = "";
  document.getElementById("col3").innerHTML = "";

    for(i = 0; i < arr.length; i++) { 

        var newDiv = document.createElement("div");
        newDiv.id = arr[i].national_id;
        newDiv.addEventListener("click", getPokemonParam);
        
        elem = "col" + col;
        document.getElementById(elem).appendChild(newDiv);
        if (y++%4 === 0) {col++;}
        
        type = "<div class = 'types'>";
        for (t = 0; t < arr[i].types.length; t++){

        var spanStyle = "<span style= color:"+typesColor[arr[i].types[t].name]+ ">";

       //  type+= "<div class = 'types'>" +spanStyle +"" + arr[i].types[t].name;
              type+= spanStyle +" " + arr[i].types[t].name;
      }

        out = "<img src = http://pokeapi.co/media/img/"+arr[i].national_id+'.png>'+ "<br>" + 
                                  arr[i].name +"<br>" +type;
       
        newDiv.innerHTML = out;

        type ="";
       }

  }



 function getPokemonParam(){
     var national_id = this.id;
     var url = urlSinglePokemon + "" + national_id;
     loadDoc(url, getSingle);
}

function getSingle(xmlhttp){

    var arr = JSON.parse(xmlhttp.responseText);
    
  
  var newTR  = "";
  var newtd  = "";
  var newtd2 = "";
  var types  = "";

 document.getElementById("detail").innerHTML = "";
 
 
  var headerTable = "<img src = http://pokeapi.co/media/img/"+arr.national_id+ ".png> <br>" +
                   arr.name +" #"+ arr.national_id;

  document.getElementById("header-table").innerHTML = headerTable;

  for (k = 0; k < arr.types.length; k++){
    types+= arr.types[k].name + "<br>";
  }

  var abilities = 
     {"Types":     types,
      "Attack":    arr.attack,
     "Defense":    arr.defense,
     "HP":         arr.hp,
     "SP Attack":  arr.sp_atk,
     "SP Defense": arr.sp_def,
     "Speed":      arr.speed,
     "Weight":     arr.weight,
     "Total moves": arr.moves.length  
     };

  for (var key in abilities){
  newTR = document.createElement("tr");
  document.getElementById("detail").appendChild(newTR);
  
  newtd = document.createElement("td");
  newTR.appendChild(newtd);
  newtd.innerHTML = key;

  newtd2 = document.createElement("td");
  newTR.appendChild(newtd2);
  newtd2.innerHTML = abilities[key];
   }
}

  function loadMore(){
    loadDoc(nextList, getObjectList);
  }
   




 /* function changeList(xmlhttp){
    var myArr = JSON.parse(xmlhttp.responseText);
    nextList = mainURL +""+myArr.meta.next;
    var arr = myArr.objects;
    getList(arr);
  }*/
