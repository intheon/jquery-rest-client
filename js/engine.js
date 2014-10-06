
$('#readerXML').change(function (){
	var readerXml = $("#readerXML").find("input").serialize();
});

$(document).ready(function(){
	checkIfLoggedIn();
});

function checkIfLoggedIn()
{
	if (localStorage.restClientIsLoggedIn == null)
	{
		// not logged in -- needs log in prompt
		showElement('#logInPrompt');
		hideElement('#toolbar');
		hideElement('#content');
	}
	else
	{
		// logged in -- needs content
		showElement('#toolbar');
		showElement('#content');
		hideElement('#logInPrompt');
		addUsernameToToolbar();
	}
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


function addUsernameToToolbar()
{
	var adminName = localStorage.getItem("adminName");
	$("#adminName").html(adminName);
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
	event.bubbles = false ;
		console.log(event);
	$("#readersActions").hide();
	$("#readersHTML").append("<form><input type='text' ><br /><input type='text' ><br /></form>");
}

function queryReader()
{
	$("#readersActions").hide("fast");
	$("#readersHTML").append("<div id='queryReader'><form><label>Are you querying all, or a specific reader?</label><input type='button' value='All Readers' onclick='queryAllReaders()'><input type='button' value='Specific Readers'></form></div>").hide().slideDown("medium");

}


