function search(search_content,category){
	$(".pagination").empty();
	$(".search-block>p").text("Searching...");
	$.ajax({
		type:"GET",
		headers:{'Application_key':'13524932'},
		url:"https://api.fitobe.com/fitobe/api/article/share/search"+"?search_content="+search_content+"&category="+category,
		success:function(data){
			console.log("Searching "+category+" about "+search_content,data);
			var articles = data.articleList.articles;
			var result = $(".search-result");

			if(articles.length==0){
				$(".search-block>p").text("No result.");
			}else{

				if(search_content!=''){
					$(".search-block>p").text("About "+search_content+" 's contents have "+articles.length+" results");
				}else{
					$(".search-block>p").text("About "+category+" 's contents have "+articles.length+" results");	
				}
				
				addOtherPage(data.articleList.pageLast);
				articles.map(function(articles){

					if(articles.language=='zh-Hant'){

						result.append
							("<a href="+'zh/article?id='+articles.articleID+"><div class='result-img' style='background-image:url("+articles.coverPhoto+");'><div class='result-title'>"+articles.title+"</div>"+
							"</div></a>");
					}else{
						result.append
							("<a href="+'en/article?id='+articles.articleID+"><div class='result-img' style='background-image:url("+articles.coverPhoto+");'><div class='result-title'>"+articles.title+"</div>"+
							"</div></a>");
					}
						
				},this);
			}
			
			
		}.bind(this),
		error:function(){
			alert("Searching fail!");
		}.bind(this)
	});
}
function clickSearch(){
	$(".search-result").empty();
	var search_content = $("#search-input").val();
	var category = $("#category-select").val();
	search(search_content,category);
}
function clickChangePage(pageNumber){

		$(".search-result").empty();
		var search_content = $("#search-input").val();
		var category = $("#category-select").val();

		$.ajax({
			type:"GET",
			headers:{'Application_key':'13524932'},
			url:"https://api.fitobe.com/fitobe/api/article/share/search"+"?search_content="+search_content+"&category="+category+"&page="+pageNumber,
			success:function(data){
				console.log("Change to page "+pageNumber);
				var articles = data.articleList.articles;
				var result = $(".search-result");
				console.log(data);
				articles.map(function(articles){

					if(articles.language=='zh-Hant'){

						result.append
							("<a href="+'zh/article?id='+articles.articleID+"><div class='result-img' style='background-image:url("+articles.coverPhoto+");'><div class='result-title'>"+articles.title+"</div>"+
							"</div></a>");
					}else{
						result.append
							("<a href="+'en/article?id='+articles.articleID+"><div class='result-img' style='background-image:url("+articles.coverPhoto+");'><div class='result-title'>"+articles.title+"</div>"+
							"</div></a>");
					}

				},this);
			}.bind(this),

			error:function(){
				alert("Searching fail!");
			}.bind(this)
		});
}
function addOtherPage(page){
	for(var i =1; i <= page.lastPage; i++){
		$(".pagination").append("<li><a class='next' page="+i+">Page "+i+"</a></li>");
	}
	$(".next").click(function(){
		var pageNumber= $(this).attr("page");
		clickChangePage(pageNumber);
	});
}

function loadHotArticle(){
	$(".pagination").empty();
	$(".search-result").empty();
	$(".search-block>p").text("loading...");
	$.ajax({
			type:"GET",
			headers:{'Application_key':'13524932','lang':'en'},
			url:"https://api.fitobe.com/fitobe/api/article/share/list",
			success:function(data){
				console.log("Article list api connect successfully",data);
				var result = $(".search-result");
				var articles = data.articleList.articles;
				articles.map(function(articles){
					result.append
							("<a href="+'en/article?id='+articles.articleID+"><div class='result-img' style='background-image:url("+articles.coverPhoto+");'><div class='result-title'>"+articles.title+"</div>"+
							"</div></a>");
					$(".search-block>p").text("");
				},this);
			}.bind(this),
			error:function(){
				alert("receive article list error!");
			}.bind(this)
		});	
}	


$(document).ready(function(){
	$("#search-input").focus();
	$("#search").click(function(){
		clickSearch();
	});

	$(document).keydown(function(event){   
	   	if(event.keyCode == 13){
	   		clickSearch();
		}
	});
	$(".gethot").click(function(){
		loadHotArticle();
	})
});
