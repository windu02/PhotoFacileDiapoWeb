var serverUrl = "";
var selectedPictures = [];

var addToSelectedPictures = function(id) {
	if($.inArray(id, selectedPictures) == -1) {
		selectedPictures.push(id);
	}
}

var removeFromSelectedPictures = function(id) {
	if($.inArray(id, selectedPictures) != -1) {
		var indexToRemove = selectedPictures.indexOf(id);
		if (indexToRemove > -1) {
		    selectedPictures.splice(indexToRemove, 1);
		}
	}
}

var buildDiapoManager = function(data) {
	
	var picturesByUser = [];
	$.each(data.pictures, function(index, picture) {
		if(typeof(picturesByUser[picture.user]) == "undefined") {
			picturesByUser[picture.user] = [];
		}
		picturesByUser[picture.user].push(picture);
	});
	
	
	
	for(var user in picturesByUser) {
		var picturesList = picturesByUser[user];
		var div = $("<div></div>");
		div.addClass("container");
		var UserTitle = $("<h1></h1>");
		UserTitle.html("Photos de " + user);
		div.append(UserTitle);

		var divRow = $("<div></div>");
		divRow.addClass("row");

		var i = 0;
		$.each(picturesList, function(index, picture) {
			
			if(i%3 == 0) {
				div.append(divRow);
				divRow = $("<div></div>");
				divRow.addClass("row");
				i = 0;
			}
			
			var divPicture = $("<div></div>");
			divPicture.addClass("col-md-4");
			
			
			
			var img = $("<img/>");
			img.attr("src",serverUrl + picture.url);
			img.attr("width","300px");
			img.addClass("img-thumbnail");
			divPicture.append(img);
			
			var accepter = $("<button></button>");
			accepter.addClass("btn btn-success");
			accepter.html("Accepter");
			accepter.click(function() {
				addToSelectedPictures(picture.id);
				img.css( "border", "solid 5px green" );
			});
			divPicture.append(accepter);
			
			var refuser = $("<button></button>");
			refuser.addClass("btn btn-danger");
			refuser.html("Refuser");
			refuser.click(function() {
				removeFromSelectedPictures(picture.id);
				img.css( "border", "solid 5px red" );
			});
			divPicture.append(refuser);
			
			
			
			divRow.append(divPicture);
			
			i++;
		});
		
		div.append(divRow);
		
		$( "#diapomanager" ).append(div);
	}
}


$(document).ready(function() {
		var contentPath = window.location.search.substr(1);
		if (!contentPath)
			contentPath = '192.168.1.15:8182';
			
		serverUrl = "http://" + contentPath + "/";
		
		$("#saveOk").hide();
		
		$("#saveButton").click(function() {
			if(selectedPictures.length > 0) {
				/*var selectedPicsJSon = {};
				selectedPicsJSon["ids"] = [];
				for(var i in selectedPictures) {
					var picId = selectedPictures[i];
					var idJSon = {};
					idJSon["id"] = picId;
					selectedPicsJSon["ids"].push(idJSon);
				}
				
				var selectedPicturesJSonData = JSON.stringify(selectedPicsJSon);
				console.log(selectedPicturesJSonData);
				*/
				var selectedPicturesData = selectedPictures.join("-");
				console.log(selectedPicturesData);
				$.ajax({
				  type: "GET",
				  url: serverUrl + "Server/getDiapIds/" + selectedPicturesData,
				  success: function() {
				  	$("#saveOk").show();
				  }
				});
			}
		});
		
		$.ajax({
		  url: serverUrl + "Server/getEligiblePictures",
		  success: buildDiapoManager
		});
});