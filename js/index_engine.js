
$('#readerXML').change(function (){
	var readerXml = $("#readerXML").find("input").serialize();
});

$(document).ready(function(){
	checkIfLoggedIn();

	$(".menu li").click(function(event){
		drawContentPanel(event.currentTarget.id);
	});

	 $('ul.tabs').each(function(){
	    // For each set of tabs, we want to keep track of
	    // which tab is active and it's associated content
	    var $active, $content, $links = $(this).find('a');

	    // If the location.hash matches one of the links, use that as the active tab.
	    // If no match is found, use the first link as the initial active tab.
	    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
	    $active.addClass('active');

	    $content = $($active[0].hash);

	    // Hide the remaining content
	    $links.not($active).each(function () {
	      $(this.hash).hide();
	    });

	    // Bind the click event handler
	    $(this).on('click', 'a', function(e){
	      // Make the old tab inactive.
	      $active.removeClass('active');
	      $content.hide();

	      // Update the variables with the new link and content
	      $active = $(this);
	      $content = $(this.hash);

	      // Make the tab active.
	      $active.addClass('active');
	      $content.show();

	      // Prevent the anchor's default click action
	      e.preventDefault();
	    });
	  });

});

function checkIfLoggedIn()
{
	if (localStorage.restClientIsLoggedIn == null)
	{
		// not logged in -- needs log in prompt
		showElement('#logInPrompt');
		hideElement('#toolbar');
		hideElement('#content');
		hideElement('#sidePanel');
	}
	else
	{
		// logged in -- needs content
		showElement('#toolbar');
		showElement('#content');
		showElement('#sidePanel');
		hideElement('#logInPrompt');
		addUsernameToToolbar();
	}
}

var typesOfContentPane = {
	paneOne: "readers_menu_content",
	paneTwo: "editions_menu_content",
	paneThree: "access_menu_content",
	paneFour: "config_menu_content"
};

function drawContentPanel(whichTask)
{
	var c = $("#" + whichTask + "_content");

	switch (whichTask)
	{
		case "readers_menu" : 
			hideShit(c);
			c.fadeIn();
			break;
		case "editions_menu" : 
			hideShit(c);
			c.fadeIn();
			break;
		case "access_menu" : 
			hideShit(c);
			c.fadeIn();
			break;
		case "config_menu" : 
			hideShit(c);
			c.fadeIn();
			break;
	}

	function hideShit(c)
	{
		for (val in typesOfContentPane){
			if (typesOfContentPane.hasOwnProperty(val))
			{
				if (typesOfContentPane[val] !== c)
				{
					var paneToHide = typesOfContentPane[val];
					$("#" + paneToHide).fadeOut(600);
				}
			}
		}
	}

}

function addUsernameToToolbar()
{
	var adminName = localStorage.getItem("adminName");
	$("#adminName").html(adminName);
}



function showElement(element)
{
	$(element).fadeIn(800);
}
function hideElement(element)
{
	$(element).fadeOut();
}



function grabValues()
{
	var object = $('#getAccessKeys').serialize();
	var arr = object.split("&");;
		for (i = 0; i < arr.length; i++)
		{
			var arrProp = arr[i].split("=");
			localStorage.setItem(arrProp[0],arrProp[1]);
			localStorage.setItem("restClientIsLoggedIn",true);
		}
	checkIfLoggedIn();
}

function logMeOut()
{
	localStorage.removeItem("restClientIsLoggedIn");
	checkIfLoggedIn();
}

$(".clickable").toggle(animateOn,animateOff);

var typesOfPane = {
	paneOne: "readersPane",
	paneTwo: "editionsPane",
	paneThree: "accessPane"
};

function animateOn(event)
{
	// get targets

	var id = event.currentTarget.parentElement.id;
	var sliced = id.substr(0,id.length - 4)  + "Actions";
	
	// hides other panels

	for (val in typesOfPane){
		if (typesOfPane.hasOwnProperty(val))
		{
			if (typesOfPane[val] !== id)
			{
				//found items to remove!
				var paneToHide = typesOfPane[val];
				$("#" + paneToHide).fadeOut(1000);
			}
		}
	}

	// nicely expands focused panel and shows options
	$("#" + id).animate({ "height": "+=17%","width": "+=17%"}, "slow" );
	$(".clickable").append("<span class='closeBtn'>X</span>");
	$(".closeBtn").fadeIn(1000);
	showElement("#" + sliced);
}

function animateOff(event)
{
	var id = event.currentTarget.parentElement.id;
	var sliced = id.substr(0,id.length - 4)  + "Actions";

	for (val in typesOfPane){
		if (typesOfPane.hasOwnProperty(val))
		{
			if (typesOfPane[val] !== id)
			{
				var paneToShow = typesOfPane[val];
				$("#" + paneToShow).show().hide().fadeIn(1000)
			}
		}
	}
	$("#" + id).animate({ "height": "-=17%","width":"-=17%"}, 1500 );
	$(".closeBtn").fadeOut(1000);
	$(".closeBtn").remove();
	hideElement("#" + sliced);	
}

function createReader()
{
	$("#readersActions").hide();
	$("#readersHTML").append("<form><input type='text' ><br /><input type='text' ><br /></form>");



	function submitToPHP(queryString,numberOfPosts){

	$.ajax({
  		type: "POST",
  		url: "processorWIP.php",
  		data: "queryString="+queryString+"&numberOfPosts="+numberOfPosts,
  		success: function(text){
  			 //output.innerHTML = text
  			 lovelyData = text;
  			 drawOutput(lovelyData);
  		}
  	});
} 


}

function queryReader()
{
	$("#readersActions").hide("fast");
	$("#readersHTML").append("<div id='queryReader'><form><label>Are you querying all, or a specific reader?</label><br/><input type='button' value='All Readers' onclick='queryAllReaders()'><br /><input type='button' value='Specific Readers' onclick='querySpecificReaders()'></form></div>");
}

function queryAllReaders()
{
	$("#readersHTML").html("");

	$.ajax({
  		type: "POST",
  		url: "http://intheon.xyz/hope/mainRestScript.php",
  		data: "",
  		success: function(text){
  			 console.log(text);
  		}
  	});
}



