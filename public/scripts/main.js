$(document).ready(function(){

var alphabetHeight = $(".alphabetpicker").height();
var alphabetWidth = $(".alphabetpicker").width();

$(".programme_container").css("height",alphabetHeight);
$(".programme_container").css("max-height",alphabetHeight);
$(".programme_container").css("left",alphabetWidth);
$(".programme_container").css("width",window.innerWidth - alphabetWidth);
$(".inner_programme_container").css("height",alphabetHeight - 70 );

$( window ).resize(function() {


$(".programme_container").css("width",window.innerWidth - alphabetWidth);


});




})


var app = angular.module('iPlayer', ['ngResource']);

app.controller('programmes', function($scope,$http,$resource) {


$scope.alphabet = [

{'UpperCase':'A','LowerCase':'a'},
{'UpperCase':'B','LowerCase':'b'},
{'UpperCase':'C','LowerCase':'c'},
{'UpperCase':'D','LowerCase':'d'},
{'UpperCase':'E','LowerCase':'e'},
{'UpperCase':'F','LowerCase':'f'},
{'UpperCase':'G','LowerCase':'g'},
{'UpperCase':'H','LowerCase':'h'},
{'UpperCase':'I','LowerCase':'i'},
{'UpperCase':'J','LowerCase':'j'},
{'UpperCase':'K','LowerCase':'k'},
{'UpperCase':'L','LowerCase':'l'},
{'UpperCase':'M','LowerCase':'m'},
{'UpperCase':'N','LowerCase':'n'},
{'UpperCase':'O','LowerCase':'o'},
{'UpperCase':'P','LowerCase':'p'},
{'UpperCase':'Q','LowerCase':'q'},
{'UpperCase':'R','LowerCase':'r'},
{'UpperCase':'S','LowerCase':'s'},
{'UpperCase':'T','LowerCase':'t'},
{'UpperCase':'U','LowerCase':'u'},
{'UpperCase':'V','LowerCase':'v'},
{'UpperCase':'W','LowerCase':'w'},
{'UpperCase':'X','LowerCase':'x'},
{'UpperCase':'Y','LowerCase':'y'},
{'UpperCase':'Z','LowerCase':'z'} ];


$scope.page = 1;

$scope.letter = 'a';

$scope.listcount = 0;

$scope.letterPos = 0 ; 

$scope.list = [];

$scope.init = function () {


     $scope.currentLetter(0);


};



$scope.currentLetter = function (para,event) {


$scope.letter = $scope.alphabet[para].LowerCase ;


$scope.page = 1;

$http.get("https://ibl.api.bbci.co.uk/ibl/v1/atoz/"+$scope.letter+"/programmes?page="+$scope.page).then(function(response) {


$scope.listcount = Math.round(Number(response.data.atoz_programmes.count) / 20 );

$scope.list = response.data.atoz_programmes.elements;


    });


/*
var resource = $resource(':base_uri/ibl/v1/atoz/:letter/programmes?page=:page',{

          base_uri:"https://ibl.api.bbci.co.uk",
          letter:"@letter",
          page:"@page",
         

});


var programme_list = resource.query(

{

          letter:$scope.alphabet[para].LowerCase,
          page:$scope.page,
        


}, function() {  


$scope.listcount = Math.round(Number(programme_list.atoz_programmes.count) / 20 );

$scope.list = programme_list.atoz_programmes.elements;


});
*/

$(".letter_idx").removeClass("letter_active");

document.getElementsByClassName("letter_idx")[para].classList.add("letter_active");

document.getElementsByClassName("pag_idx")[$scope.page-1].classList.add("active");



}



$scope.totalPages = function(para) {

return new Array(para);


}


$scope.currentPage = function (para,event) {


  $scope.page = para;

  if ($scope.page  > $scope.listcount) {$scope.page = $scope.listcount} 

  if ($scope.page  < 1) {$scope.page  = 1 } ;



$http.get("https://ibl.api.bbci.co.uk/ibl/v1/atoz/"+$scope.letter+"/programmes?page="+$scope.page).then(function(response) {

$scope.listcount = Math.round(Number(response.data.atoz_programmes.count) / 20 );

$scope.list = response.data.atoz_programmes.elements;


    });


$(".pag_idx").removeClass("active");

document.getElementsByClassName("pag_idx")[$scope.page-1].classList.toggle("active");


}


$scope.programmeMore = function() {

alert("Further informaion is not avaiable at this time.");

}

$scope.plusPage = function(para) {


$scope.currentPage($scope.page += para);


}



});

