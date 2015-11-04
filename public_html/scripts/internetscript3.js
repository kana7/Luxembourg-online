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
				/*
				setTimeout(function(){
					$(".btnVerif").click();
				},200);
				*/
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
	$(".btnVerif2").click(function(){
	
		window.location.href="lolinternet_komp.htm#"+$("#zipcode").val()+";"+$("#ville").val()+";"+$("#rue").val()+";"+$("#numero").val();
	});
	$("#btnVerif").click(function(){
			
			if($("#ville").val() == 98 || $("#ville").val() == 428 || $("#ville").val() == 159 || $("#ville").val() == 174){
				window.location.href="http://www.internet.lu/lolinternet_cable.htm";
			}
			
			if($("#numero").val()!=""){
				$(".boxImg").hide();
				$.ajax({
					url:"http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=FOServiceMap:FOServiceListNew.phs&_HomeId="+$("#numero").val(),
					dataType: 'jsonp',
					success:function(data){
						obj=data;
						ab=["","","","","","",""];
						
						if(obj.Service[6]){  // Dégroupage DSL
							articleObj=obj.Service[6].article;
							if(obj.Service[6] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject == "5257" && ab[0]==""){// LOL DSL 24
											ab[0]=articleObj[b].idObject;
										}
									}
									
								}
								
							}
						}
						if(obj.Service[2]){ // Dégroupage Fibre
							articleObj=obj.Service[2].article;
							if(obj.Service[2] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject == "5272" && ab[1]==""){//Fiber 30 dégroupé
											ab[1]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5275" && ab[2]==""){//Fiber 100 dégroupé
											ab[2]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5276" && ab[2]==""){//Fiber 200 dégroupé
											ab[3]=articleObj[b].idObject;
										}
									}
									
								}
							}
						}
						if(obj.Service[8]){ // Dégroupage VDSL
							articleObj=obj.Service[8].article;
							if(obj.Service[8] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject == "5273" && ab[1]==""){//Fiber 30
											ab[1]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5274" && ab[2]==""){//Fiber 100 1 paire
											ab[2]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5336" && ab[2]==""){//Fiber 100 2 paires
											ab[2]=articleObj[b].idObject;
										}
									}
									
								}
							}
						}
						if(obj.Service[5]){ // Revente Fibre
							articleObj=obj.Service[5].article;
							if(obj.Service[5] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject == "5262" && ab[1]==""){//Fiber 30
											ab[1]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5263" && ab[2]==""){//Fiber 100
											ab[2]=articleObj[b].idObject;
										}
										if(articleObj[b].idObject == "5264" && ab[3]==""){//Fiber 200
											ab[3]=articleObj[b].idObject;
										}
									}
									
								}
								
							}
						}
						if(obj.Service[4]){ // Revente VDSL 30
							articleObj=obj.Service[4].article;
							if(obj.Service[4] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject == "5262" && ab[1]==""){//Fiber 30
											ab[1]=articleObj[b].idObject;
										}

									}
									
								}
							}
						}
						if(obj.Service[41]){ // Revente VDSL 100 1 paire
							articleObj=obj.Service[41].article;
							if(obj.Service[41] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject=="5263" && ab[2]==""){//Fiber 100 1 paire
											ab[2]=articleObj[b].idObject;
										}
									}
									
								}
							}
						}
						if(obj.Service[42]){ // Revente VDSL 100 2 paires
							articleObj=obj.Service[42].article;
							if(obj.Service[42] && $(articleObj[0]).size()>0){//entry exists
								for(i in articleObj){
									for(b in articleObj){
										if(articleObj[b].idObject=="5263" && ab[2]==""){//Fiber 100 2 paires
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
						
							
							
							if (ab[2]==""&&ab[3]==""){
								$("#offresNon").show();
								$(".k100a,.k200a,.k100,.k200,.ik100,.ik200").hide();
								}
							
							else {
							
							
							
							if(ab[2]!=""){$(".k100").show();
							$( "#foo" ).fadeIn( 1000 ).delay( 1000 ).fadeOut( 1000 );
							$("#offresNon,.k100a,.k200a").hide();
							}
							
							else{$(".ik100").show();
							$("#offresNon,.k100a,.k200a").hide();
							}
							
							if(ab[3]!=""){$(".k200").show();
							$( "#foo1" ).fadeIn( 1000 ).delay( 1000 ).fadeOut( 1000 );
							$("#offresNon,.k100a,.k200a").hide();
							}
							
							else{$(".ik200").show();
							$("#offresNon,.k100a,.k200a").hide();
							}
								}
						$("#light,#fade").hide();
						$(".btnVerif").fadeIn();
					}
				});
				
			}

	});
});

		
