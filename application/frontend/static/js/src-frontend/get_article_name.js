$(function(){

$("#selected_article").prepend("Selected article is: " + "<a target='_blank' href='http://"+wikiLang+".wikipedia.org/wiki/" + "'>" + localStorage.getItem('selected_article')+ "</a>  ");

$("#wikigen-logo").click( function() {
        window.location.replace("http://0.0.0.0:8000/");
    });

$("#change_article").click( function() {
        window.location.replace("http://0.0.0.0:8000/");
    });

});