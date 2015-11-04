function natSort(as, bs){
	var a, b, a1, b1, i= 0, L, rx=  /(\d+)|(\D+)/g, rd=  /\d/;
	if(isFinite(as) && isFinite(bs)) return as - bs;
	a= String(as["number"]).toLowerCase();
	b= String(bs["number"]).toLowerCase();
	if(a === b) return 0;
	if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
	a= a.match(rx);
	b= b.match(rx);
	L= a.length> b.length? b.length: a.length;
	while(i < L){
		a1= a[i];
		b1= b[i++];
		if(a1!== b1){
			if(isFinite(a1) && isFinite(b1)){
				if(a1.charAt(0)=== "0") a1= "." + a1;
				if(b1.charAt(0)=== "0") b1= "." + b1;
				return a1 - b1;
			}
			else return a1> b1? 1: -1;
		}
	}
	return a.length - b.length;
}

var obj={},
	streetList={},
	currRue="",
	ab=[],
	nbrTimeout="",
	vhash="",
	_cp="",_ville="",_rue="",_nbr="";

$(function(){
	try{
		vhash=(window.location.hash.split('#')[1]).split(";");
		
		
		if(window.location.hash.length>2){
			_cp=vhash[0];
			_ville=vhash[1];
			_rue=vhash[2];
			_nbr=vhash[3];
			$("#zipcode").val(_cp);
			
			setTimeout(function(){
				$("#verifyCp").click();
			},10);
		}else{
			$("#zipcode").val("")
		}
	}catch(e){
		$("#zipcode").val("")
	};
	$("#zipcode").mask("L-9999");
	
	$(".lightBox").click(function(){
		return false;
	});
	$(".lightBox").each(function(){
		
		$(this).lightBox({
			keyToPrev:false,
			keyToNext:false,
			keyToClose:false,
			fixedNavigation:true,
			imageBtnNext:"",
			imageBtnPrev:"",
			imageBtnClose:""
		});
	
	});
	
	$("#zipcode").keypress(function(){
		if(event.which == 13){//enter pressed
			$(this).next().click();
		}
	
	});
	/*
	$("#ville").hide();
	$("#rue").hide();
	$("#numero").hide();
	
	$("#zipcode").keyup(function(){
		$(".boxImg").hide();
		$("#ville").hide();
		$("#rue").hide();
		$("#numero").hide();
		$(".btnVerif").hide();
	});
	$("#verifyCp").click(function(){
		
		$(".boxImg").hide();
		$("#ville").hide();
		$("#rue").hide();
		$("#numero").hide();
		$(".btnVerif").hide();
		$.ajax({
			url:'http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=cpList.phs&_iZip='+$("#zipcode").val().substr(2,$("#zipcode").val().length-1),
			dataType:'jsonp',
			success:function(data){
				streetList=data;
				arrLocality=[];
				locality="<option>Choisissez votre localité</option>";
				var vhtml="<option data-idLocality='-1'>Choisissez votre adresse</option>";
				for(i in streetList.Streets){
					vhtml+="<option value='"+streetList.Streets[i].id+"' title='"+streetList.Streets[i].name+"' data-idLocality='"+streetList.Streets[i].idLocality+"'>"+streetList.Streets[i].name+"</option>";	
					streetList.Streets[i].streetNumbers.sort(natSort);//order streetNumbers numeric
					arrLocality[streetList.Streets[i].idLocality]=streetList.Streets[i].azLocality;
				}
				for(idLocality in arrLocality){
					locality+="<option value='"+idLocality+"' title='"+arrLocality[idLocality]+"'>"+arrLocality[idLocality]+"</option>";
				}
				if($(locality).length<2 || $("#zipcode").val().substr(2,$("#zipcode").val().length-1)<1000){
					locality="<option>Code postal inconnu</option>"
				}
				
				$("#ville").html(locality).fadeIn();
				$("#rue").html(vhtml);
				if($(locality).length==2){
					$("#ville").prop("selectedIndex", 1).change();
					$("#ville option").first().remove();
				}
				if($("#rue option").length==2){
					$("#rue").prop("selectedIndex", 1).change();
					$("#rue option").first().remove();
				}
				if(vhash.length!=0){
					$("#ville option").each(function(){
						if($(this).val()==_ville){
							$(this).parent().prop("selectedIndex", $(this).index()).change();
						}
					});
					$("#rue option").each(function(){
						if($(this).val()==_rue){
							$(this).parent().prop("selectedIndex", $(this).index()).change();
						}
					});
					
				}
			}
		});
		
	});
	$("#ville").change(function(){
		thisId=$(this).find("option:selected").val();
		$("#rue option").each(function() {
			if($(this).attr("data-idLocality")==thisId || $(this).attr("data-idLocality")=="-1"){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#rue").fadeIn();
	});
	
	$("#rue").change(function(){
		for(i in streetList.Streets){
			if(streetList.Streets[i].id==$("#rue").val()){
				streetNbr=streetList.Streets[i].streetNumbers;
				var vhtml="<option>Choisissez le numéro</option>";
				for(b in streetNbr){
					number=streetNbr[b].number.length>0?"Numéro:"+streetNbr[b].number+"\n":"";
					building=streetNbr[b].building.length>0?"Bâtiment:"+streetNbr[b].building+"\n":"";
					floor=streetNbr[b].floor.length>0?"Étage:"+streetNbr[b].floor+"\n":"";
					apartment=streetNbr[b].apartment.length>0?"Appartement:"+streetNbr[b].apartment+"\n":"";
					vhtml+="<option value='"+streetNbr[b].id+"' title='"+number+building+floor+apartment+"'>"+(streetNbr[b].number.length>0?streetNbr[b].number:"Aucun")+" "+streetNbr[b].building+" "+streetNbr[b].floor+" "+streetNbr[b].apartment+"</option>";
				}
				$("#numero").html(vhtml).fadeIn();
				
				if(vhash.length!=0){
					$("#numero option").each(function(){
						if($(this).val()==_nbr){
							$(this).parent().prop("selectedIndex", $(this).index()).change();
							$(".btnVerif").fadeIn();
							setTimeout(function(){$(".btnVerif").click();},200);
						}
					});
				}
			}
		}
	});
	$("#numero").change(function(){
		
		$(".btnVerif").fadeIn();
		
	});
	$("#btnVerif2").click(function(){
		window.location.href="lolinternet_komp.htm#"+$("#zipcode").val()+";"+$("#ville").val()+";"+$("#rue").val()+";"+$("#numero").val();
	});
	$("#btnVerif").click(function(){
		
		if($("#numero").val()!=""){
			$(".boxImg").hide();
			$.ajax({
				url:"http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=FOServiceMap:FOServiceListNew.phs&_HomeId="+$("#numero").val(),
				dataType: 'jsonp',
				success:function(data){
					obj=data;
					ab=["","","","","","",""];
					var _cookie = {
						"address": {
							"pc": $("#zipcode").val(),
							"city": $("#ville").val(),
							"street": $("#rue").val(),
							"number":$("#numero").val()
						}
					}
					
					$.cookie('adress', JSON.stringify(_cookie));
					$.cookie('available_products', JSON.stringify(data));
					
					if(obj.Service[6]){
						articleObj=obj.Service[6].article;
						if(obj.Service[6] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject == "2611" && ab[0]==""){//Komplett 30
										ab[0]=articleObj[b].idObject;
									}
								}
							}
						}
					}
					if(obj.Service[8]){
						articleObj=obj.Service[8].article;
						if(obj.Service[8] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject == "2832" && ab[1]==""){//Komplett 30
										ab[1]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject == "2833" && ab[2]==""){//Komplett 100 (1 pair ??)
										ab[2]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject == "2965" && ab[2]==""){//Komplett 100 (2 pair ??)
										ab[2]=articleObj[b].idObject;
									}
								}
								
							}
						}
					}
					if(obj.Service[5]){
						articleObj=obj.Service[5].article;
						if(obj.Service[5] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject == "2927" && ab[1]==""){//Fibre 30
										ab[1]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject == "3264" && ab[2]==""){//VDSL 100 x pairs
										ab[2]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject == "3266" && ab[3]==""){//Fibre 200
										ab[3]=articleObj[b].idObject;
									}
								}
								
							}
							
						}
					}
					if(obj.Service[4]){
						articleObj=obj.Service[4].article;
						if(obj.Service[4] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject=="2927" && ab[1]==""){//VDSL
										ab[1]=articleObj[b].idObject;
									}
								}
								
							}
						}
					}
					if(obj.Service[41]){
						articleObj=obj.Service[41].article;
						if(obj.Service[41] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject=="3264" && ab[2]==""){//VDSL
										ab[2]=articleObj[b].idObject;
									}
								}
								
							}
						}
					}
					if(obj.Service[42]){
						articleObj=obj.Service[42].article;
						if(obj.Service[42] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject=="3264" && ab[2]==""){//VDSL
										ab[2]=articleObj[b].idObject;
									}
								}
								
							}
						}
					}
					if(obj.Service[3]){
						articleObj=obj.Service[3].article;
						if(obj.Service[3] && $(articleObj[0]).size()>0){//entry exists
							for(i in articleObj){
								for(b in articleObj){
									if(articleObj[b].idObject=="2188" && ab[4]==""){//LOL KOMPLETT Start
										ab[4]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject=="2189" && ab[5]==""){//LOL KOMPLETT Run
										ab[5]=articleObj[b].idObject;
									}
									if(articleObj[b].idObject=="2190" && ab[6]==""){//LOL KOMPLETT Professionnal
										ab[6]=articleObj[b].idObject;
									}
								}
							}
						}
					}
					
					if(ab.toString().length==6){
						$(".k24").show();
						$(".ik30").show();
						$(".ik100").show();
						$(".ik200").show();
					}else{
						if(ab[0]!=""){$(".k24").show();}else{$(".ik24").show();}
						if(ab[1]!=""){$(".k30").show();}else{$(".ik30").show();}
						if(ab[2]!=""){$(".k100").show();}else{$(".ik100").show();}
						if(ab[3]!=""){$(".k200").show();}else{$(".ik200").show();}
						if(ab[4]!=""){$(".kstart").show();}else{$(".ikstart").show();}
						if(ab[5]!=""){$(".krun").show();}else{$(".ikrun").show();}
						if(ab[6]!=""){$(".kpro").show();}else{$(".ikpro").show();}
					}
					$("#adressLabel").html($("#numero option:selected").text()+","+$("#rue option:selected").text()+","+$("#zipcode").val()+" "+$("#ville option:selected").text() );
					$(".btnVerif").fadeIn();
				}
			});
			
		}

	});
	*/
});

		
