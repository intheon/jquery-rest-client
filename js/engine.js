
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

var contentTargets = $("#content .roundPane");
	$(contentTargets).click(expandOptions);

function expandOptions()
{
	var id = event.currentTarget.id;
	$("#" + id).animate({ "height": "222px" }, "slow" );
	showElement("#readersActions");
	
}
