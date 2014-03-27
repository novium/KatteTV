curid = 0;
vid = getQuerystring("id");
if(vid != "") { curid=vid; };



$(document).ready( function() {
	setTimeout('Hider()',2000);
	iText();
});

function iText() {
	$('.time').text(moment().format('DD/MM/YY hh:mm'));
	setTimeout('iText()', 100);
}

function Hider() {
$('#divwrap').hide( 'fade', '', function() { setTimeout('ReplaceText()',700); } )
}


function ReplaceText() {
	if(vid == "") {
		qdata = "id="+curid;
	} else {
		qdata = "id="+curid+"&one=1"
	}
	// alert("qdata: "+qdata);
	$.ajax({
		url: "http://www.katedral.se/ext/itv/get.php",
		data: qdata,
		dataType: "json",
		error: function(err) {
			$('#divwrap').html('<center><br><br><br><h1 style="font-size: 50px">Katedralskolan</h1><br><br><h1>www.katedral.se</h1></center>');
			$('#divwrap').show('slide',{ direction: 'left' });
			setTimeout("Hider()",60000);
		},
		success: function(rdata) {
			curid = rdata.id;
			$('#divwrap').html(rdata.body);
			$('#divwrap').show('fade');
			if(vid == "") {
				setTimeout("Hider()",rdata.timeout);
			}
		}
	});
}

function getQuerystring(key, default_)
{
	if (default_==null) { default_=""; }

	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null) { return default_; }
	return qs[1];
}
