var buildSlideshow = function(data) {
	
	var first = true;
	
	$.each(data.pictures, function(index, picture) {
		var divPic = $("<div></div>");
		divPic.addClass("item");
		
		if(first) {
			divPic.addClass("active");
			first = false;
		}
		
		var img = $("<img/>");
		img.attr("src", serverUrl + picture.url);
		
		divPic.append(img);
		var divCaption = $("<div></div>");
		divCaption.addClass("carousel-caption");
		divCaption.html("<h1>" + picture.user + "</h1>");
		divPic.append(divCaption);
		
		$("#diapo").append(divPic);
	});
	
	$('.carousel').carousel();
}

$(document).ready(function() {
		var contentPath = window.location.search.substr(1);
		if (!contentPath)
			contentPath = '192.168.1.15:8182';
			
		serverUrl = "http://" + contentPath + "/";
		
		$.ajax({
		  url: serverUrl + "Server/getSlideshowPictures",
		  success: buildSlideshow
		});
});