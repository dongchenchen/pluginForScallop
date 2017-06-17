function getSelectText(){
	if(document.selection)
	{
		return document.selection.createRange().text;
	}
	else
	{
		return window.getSelection().toString();
	}
}

function isEnglish(str){
	var pattern = /^[A-Za-z]*$/;
	return pattern.test(str);
}

function drawTranslateBlock(e,selectText){
	$(".selection-sharing").remove();
	var left = e.clientX+"px";
	var top = e.clientY+"px";
	var contentHeight = $("#article").height();
	var url = "https://api.shanbay.com/bdc/search/?word="+selectText;
	$.get(url,function(data){
		if(data.status_code == 0)
			{
				var pronunStr = data.data.pronunciations;
				var usPart = "<span>us:<small>"+pronunStr.us+"</small></span>";
				var ukPart = "<span>uk: <small>"+pronunStr.uk+"</small></span>";
				var usSpeaker = "<span id='us' class='play_icon'></span>";
				var ukSpeaker = "<span id='uk' class='play_icon'></span>";
				var infoCard = "<div id = 'card_info' style='left:"+left+";top:"+top+"'>";
				infoCard = infoCard + "<div class= 'innerText'><h3 class = 'title'><span class='word'>"+selectText
				+"</span><div class='speak'>"+usPart+usSpeaker+ukPart+ukSpeaker+"</div></h3><div class='content'>"+data.data.definition+"</div></div>";
				infoCard = infoCard + "</div>";
				$("#top").append(infoCard);
				var cardHeight = $("#card_info").height();
				if((e.clientY+cardHeight)>contentHeight){
					$("#card_info").css('top',e.clientY-cardHeight);
				}
				initClickEvent(data.data);
			}
	});
	
}

function initClickEvent(returnData){
	$(".play_icon").click(function(e){
		var voice_category = $(this).attr('id');
		var radioURI = "";
		if(voice_category == 'us')
		{
			radioURI = returnData.us_audio;
		}
		else if(voice_category == 'uk')
		{
			radioURI = returnData.uk_audio;
		}
		radioURI = "https"+radioURI.substring(4);
		$("#radio_div").remove();
		var radioDiv = "<audio autoplay='autoplay'><source src='"+radioURI+"'/></audio>";
		$("#card_info").append(radioDiv);
		var e = e||window.event;
		e.stopPropagation();
	})
}

// function initRadio(){
// 	var radioDiv = "<audio autoplay='autoplay' controls='controls'><source src='https://media.shanbay.com/audio/us/my.mp3'/></audio>";

// 	// src='http://media.shanbay.com/audio/us/my.mp3' autostart='true' hidden='false' loop='true' id='radio_div'>";
// 	$("#top").append(radioDiv);
// }

// initRadio();
document.onmouseup = function(e){
	var e = e || window.event;
	var selectText = getSelectText();
	if(selectText.length > 0 && isEnglish(selectText))
	{
		setTimeout(function(){
			drawTranslateBlock(e,selectText);
		},100);
	}
	
}

document.onclick = function(e){
	var cardObj = document.getElementById("card_info");
	if(e.target.className == 'play_icon')
	{
		return;
	}	
	if(cardObj)
	{
		$("#card_info").remove();
	}
}
