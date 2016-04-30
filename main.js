$(function(){
	$("#pagetop").click(function(){
	    $("html,body").animate({scrollTop:0},'slow','swing');
	    var c = $(document.body).css( "background-color" );
	    $(document.body).css( "background", bgColor(c));
        $('#src').attr('rows', '20');
	    var d = $("#src").css( "border" );
        $("#src").css("border", "5px solid"+decColor(c,d)); 
        make();
		return false;
	});
});

function make(){
	var data;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","word.txt",true);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			var str = xmlhttp.responseText;
			data = str.split(/\r\n/);
     	  	$('#src').html(gen(data));
			return 0;
		}
	}
	xmlhttp.send(null);
}

function gen(data){
	var array = "";
	var l = 0;
	for(var i in data)l++;
	for(var i = 0; i < 100; i++){
	  	var rnd1 = Math.floor(Math.random()*l);
	  	var rnd2 = Math.floor(Math.random()*l);
	  	var no = Math.floor(Math.random()*4);
	  	if(rnd1==rnd2)rnd2=(rnd2+1)%l;
	  	if(no==0){
	  		array += data[rnd1]+"の"+data[rnd2]+"\n";
	  	}else if(no<3 && data[rnd1].length + data[rnd2].length < 5){
	  		var rnd3 = Math.floor(Math.random()*l);
	  		while(rnd3==rnd1 || rnd3==rnd2)
	  			rnd3 = (rnd3+1)%l;
	  		if(data[rnd3].length<5){
	  			array += data[rnd1]+data[rnd2]+"の"+data[rnd3]+"\n";
	  		}else{
	  			array += data[rnd1]+data[rnd2]+data[rnd3]+"\n";
	  		}
	  	}else{
	  		array += data[rnd1]+data[rnd2]+"\n";
	  	}
	}
	console.log(array);
	return array;
}

function decColor(c,d){
    c = c.replace("rgb(","");
    c = c.replace(")","");
    c = c.replace(/ /g,"");
    c = c.split(",");

    d = d.replace("5px solid rgb(","");
    d = d.replace(")","");
    d = d.replace(/ /g,"");
    d = d.split(",");

    for(var i = 0; i < 3; i++){
    	d[i] = Math.floor(d[i] * 1.0*c[i]/256);
    	if(d[i]<16){
			d[i] = "0"+parseInt(d[i]).toString(16);
		}else{
			d[i] = parseInt(d[i]).toString(16);
		}
    }
    var nc = "#"+d[0]+d[1]+d[2];
	return nc;
}

function bgColor(c){
    c = c.replace("rgb(","");
    c = c.replace(")","");
    c = c.replace(/ /g,"");
    c = c.split(",");
    for(var i = 0; i < 3; i++){
    	c[i] -= 30;
    	if(c[i]<0)c[i] = 0;
		if(c[i]<16){
			c[i] = "0"+parseInt(c[i]).toString(16);
		}else{
			c[i] = parseInt(c[i]).toString(16);
		}
    }
    var nc = "#"+c[0]+c[1]+c[2];
	return nc;
}