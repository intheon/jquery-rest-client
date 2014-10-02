
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

$("#content .roundPane").toggle(animateOn,animateOff);

function animateOn(event)
{
	var id = event.currentTarget.id;
	var sliced = id.substr(0,id.length - 4)  + "Actions";
	$("#" + id).animate({ "height": "250", "background-color": "#4A4646"}, "slow" );
	$("#" + id).append("<img src='http://intheon.xyz/img/closeBtn.png' class='closeBtn' width='3%'/>");
	$(".closeBtn").fadeIn(1000);
	showElement("#" + sliced);	
}

function animateOff(event)
{
	var id = event.currentTarget.id;
	var sliced = id.substr(0,id.length - 4)  + "Actions";
	$("#" + id).animate({ "height": ""}, 1500 );
	$(".closeBtn").fadeOut(1000);
	$(".closeBtn").remove();
	hideElement("#" + sliced);	
}

