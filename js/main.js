$(document).ready(function() {
		$.ajax({
		  url: "http://192.168.0.100:8182/Server/getEligiblePictures",
		  crossDomain: true,
		  dataType: 'jsonp',
		  async: false,
          contentType: "application/json",
		  success: function(data) {
		  	console.log(data);
				/*var pictures = data.pictures;
				for(var i in pictures) {
				  var picture = pictures[i];
				  
				  var li = $("<li></li>");
				  li.html("id: " + picture.id + " - name: " + picture.name + " - userId: " + picture.user_id + " - user: " + picture.user + " - url: " + picture.url);
				  var img = $("<im></img>");
				  img.src = "http://192.168.0.100:8182/" + picture.url;
				  li.append(img);
				  $( "#photos" ).append(li);
				  
				}*/
		  }
		});
});