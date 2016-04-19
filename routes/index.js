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
		}, function(e,r,b) { /* Callback 函式 */
		/* e: 錯誤代碼 */
		/* b: 傳回的資料內容 */
		if(!e){
			var jsonObject = JSON.parse(b);
			return res.render('zh_index', 
			{ 
				title: jsonObject.article.title ,
				image:jsonObject.article.coverPhoto,
				author:jsonObject.article.author,
				content:jsonObject.article.content,
				url:"http://blog.fitobe.com/zh/article?id="+req.query.id
			});
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
			var jsonObject = JSON.parse(b);
			res.render('en_index', 
			{ 
				title: jsonObject.article.title ,
				image:jsonObject.article.coverPhoto,
				author:jsonObject.article.author,
				content:jsonObject.article.content,
				url:"http://blog.fitobe.com/en/article?id="+req.query.id
			});
		}
	});   
});
router.get('/zh', function(req, res, next) {
	res.render('zh_home',{title:"FiToBe 圖書館", image:"/images/fitobe.png"});
});
router.get('/en', function(req, res, next) {
	res.render('en_home',{title:"FiToBe Library", image:"/images/fitobe.png"});
});
router.get('/', function(req, res, next) {
	res.render('home',{title:"FiToBe"});
});

		

module.exports = router;
