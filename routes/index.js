var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
/* GET zh page. */
router.get('/zh/article', function(req, res, next) {

	request({
		url: "https://api.fitobe.com/fitobe/api/article/share?article_id="+req.query.id,
		method: "GET",
		headers:{'Application_key':'13524932','lang':'zh'}
		}, function(e,r,b) { /* Callback  */
		/* error */
		/* b: data*/
		if(!e){
			// prevent wrong url input
			if(b=="{\"message\":\"header error\"}"){
				return res.send("<h1>URL error or wrong parameter.</h1><br><h2><a href='/'>Go to blog.fitobe.com</a></h2>"); 
			}
			else{
			var jsonObject = JSON.parse(b);
			request({
				url: "https://api.fitobe.com/fitobe/api/article/share/list",
				method: "GET",
				headers:{'Application_key':'13524932','lang':'zh'}
				}, function(e,r,b) { /* Callback  */
				/* e: 錯誤代碼 */
				/* b: 傳回的資料內容 */
				if(!e){

					var jsonObject2 = JSON.parse(b);
					var article_list = jsonObject2.articleList.articles;
					return res.render('zh_index', 
					{ 
						title: jsonObject.article.title ,
						image:jsonObject.article.coverPhoto,
						author:jsonObject.article.author,
						content:jsonObject.article.content,
						url:"http://blog.fitobe.com/zh/article?id="+req.query.id,
						article_list:article_list
					});
				}
				
			}); 
			}
		}		
	}); 
});
/* GET en page. */
router.get('/en/article', function(req, res, next) {

	request({
		url: "https://api.fitobe.com/fitobe/api/article/share?article_id="+req.query.id,
		method: "GET",
		headers:{'Application_key':'13524932','lang':'en'}
		}, function(e,r,b) { /* Callback 函式 */
		/* e: 錯誤代碼 */
		/* b: 傳回的資料內容 */
		if(!e){
			if(b=="{\"message\":\"header error\"}"){
				return res.send("<h1>URL error or wrong parameter.</h1><br><h2><a href='/'>Go to blog.fitobe.com</a></h2>"); 
			}else{
				var jsonObject = JSON.parse(b);
				request({
					url: "https://api.fitobe.com/fitobe/api/article/share/list",
					method: "GET",
					headers:{'Application_key':'13524932','lang':'en'}
					}, function(e,r,b) { /* Callback 函式 */
					/* e: 錯誤代碼 */
					/* b: 傳回的資料內容 */
					if(!e){
						var jsonObject2 = JSON.parse(b);
						var article_list = jsonObject2.articleList.articles;
						return res.render('en_index', 
						{ 
							title: jsonObject.article.title ,
							image:jsonObject.article.coverPhoto,
							author:jsonObject.article.author,
							content:jsonObject.article.content,
							url:"http://blog.fitobe.com/en/article?id="+req.query.id,
							article_list:article_list
						});
					}
				});
			} 
		}
	});   
});
router.get('/zh', function(req, res, next) {
	res.render('zh_home',{title:"FiToBe 圖書館",url:"http://blog.fitobe.com/zh"});
});
router.get('/en', function(req, res, next) {
	res.render('en_home',{title:"FiToBe Library",url:"http://blog.fitobe.com/en"});
});
router.get('/', function(req, res, next) {
	res.render('home',{title:"FiToBe"});
});

		

module.exports = router;
