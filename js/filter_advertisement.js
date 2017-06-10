var ads_list = [
	"div[id^=dfp-ad--]",
	".site-message"
]
var dealing_page_url = "https://www.theguardian.com/politics/2015/may/28/david-cameron-sets-off-on-mission-to-win-over-european-leaders";
var hide_list = [
	"#bannerandheader",
	".l-footer",//底部
	".content__secondary-column",//右侧链接
	".rich-link",//左侧链接
	".contributions__epic ",//捐赠
	".submeta",//分享
	".content-footer",//更多,评论等
	".content__labels",//内容左侧标题
	".content__meta-container"//左侧分享


]
//过滤掉所有页面的广告信息
function filter(){
	for(var i = 0; i < ads_list.length; i++)
	{
		$(ads_list[i]).remove();
	}
}

function hideExceptMainText(){
	var localPage = location.href;
	if(!new RegExp(dealing_page_url).test(localPage))
	{
		return;
	}
	for(var i = 0; i < hide_list.length; i++)
	{
		$(hide_list[i]).remove();
	}

}

filter();
hideExceptMainText();

