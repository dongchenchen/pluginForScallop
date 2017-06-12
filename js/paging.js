var content = $("#article");
var indexPage = 1;
var pageSize = Math.ceil(parseInt(content["0"].scrollHeight)/(parseInt($(window).height())-100));
function setContentCSS(){
	var contentHeight = parseInt($(window).height())-100;
	content.css("height",contentHeight);
	content.css("overflow-pageINdex","hidden");
	content.css("overflow-y","hidden");
	content.css("word-break","break-all");
	drawLinks();
	alinkAction();
}
function drawLinks(){
	var linkDiv = $("#link_alist");
	if(document.getElementById("link_alist"))
	{
		pageSize = Math.ceil(parseInt(content["0"].scrollHeight)/(parseInt(content.height())));
		var linkHtml = "";
		for(var i = 1; i <= pageSize; i++)
		{
			linkHtml = linkHtml + "<a href=\"javascript:void(0)\">"+i+"</a>";
		}
		linkDiv.html(linkHtml);
	}
	else
	{
		if(pageSize <= 1)
		{
			return;
		}
		var linkHtml = "<div id='link_alist'>";
		for(var i = 1; i <= pageSize; i++)
		{
			linkHtml = linkHtml + "<a href=\"javascript:void(0)\">"+i+"</a>";
		}
		linkHtml = linkHtml + "</div>";
		$(".l-side-margins").append(linkHtml);
    }
}

function goToPage(pageIndex){
	if(pageIndex > pageSize || pageIndex < 1)
	{
		return;
	}
	var scrollTopSize = (pageIndex - 1) * content.offsetHeight;
	content.scrollTop(scrollTopSize);
	indexPage = pageIndex;
}

function alinkAction(){
	$("#link_alist a").click(function(){
		var pageIndex = parseInt($(this).html());
		var scrollTopSize = (pageIndex - 1) * (parseInt($(window).height())-100);
		content.scrollTop(scrollTopSize);
	});
}


setContentCSS();
window.onresize = setContentCSS;