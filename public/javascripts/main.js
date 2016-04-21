$(document).ready(function(){
	//get url language
	var url=window.location.href;
	var split_lang = url.split("/");
	var article_lang = split_lang[3];
	console.log(article_lang);
	var al=$(".article-list");

	function loadHotArticle(){
		$.ajax({
				type:"GET",
				headers:{'Application_key':'13524932','lang':article_lang},
				url:"https://api.fitobe.com/fitobe/api/article/share/list",
				success:function(data){
					console.log("Article list api connect successfully",data);
					var hotlist = data.articleList.articles;
					hotlist.map(function(hotlist){
						al.append("<div class='hot-list-div'><a class='hot-list' href="+'article?id='+hotlist.articleID+"><h2>"+hotlist.title+"</h2></a></div>");
					},this);
				}.bind(this),
				error:function(){
					console.log("receive article list error!");
				}.bind(this)
			});	
	}	
	//loadHotArticle();
});



