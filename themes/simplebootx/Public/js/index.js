/**
 * Created by lcw on 2016/8/1.
 */

$(function(){
    //服务页问答点击事件
    $(".question").on("click",function () {
        $(this).next().stop().slideToggle("fast");
    });
    $("#search").on("click",function(){	
    	$("#search_form").submit();	
    })
    //底部留言
    $("#guestbook_submit").click(function(){
    	$("#err_tip").html('');
    	$("#tip").html('');
		var full_name = $("#username").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var msg = $("#msg").val();
		var name_empty_msg = "姓名不能为空！";
		var phone_empty_msg = "电话号码不能为空！";
		var msg_empty_msg = "留言内容不能为空！";
		var phone_err_msg = "手机号码有误，请重填！";
		var email_err_msg = "邮箱格式不正确，请重新输入！";
		if(full_name == '' || full_name == null){
			$("#err_tip").html(name_empty_msg);
			$("#username").focus();

			$("#phone").css('border','0px solid red');

			$("#username").css('border','1px solid red');
			return false;
		}
		if(phone == '' || phone == null){
			$("#err_tip").html(phone_empty_msg);
			$("#phone").focus();
			$("#username").css('border','0px solid red');
			$("#phone").css('border','1px solid red');
			return false;
		}
		if(phone !=""){
			 if(!(/^1[345789]\d{9}$/.test(phone))){
				 $("#err_tip").html(phone_err_msg);
                 $("#username").css('border','0px solid red');
                 $("#phone").css('border','1px solid red');
			        return false; 
			 }else{
				 $("#phone").css('border','0px solid red');
			 }
		}
		if (email != "") {
	      	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	     	isok= reg.test(email );
	       	if (!isok) {
	       		$("#err_tip").html(email_err_msg);
	            $("#email").focus(function(){
					$("#phone").css('border','0px solid red');

					$("#username").css('border','0px solid red');
				});

	            return false;
	        }
	    }

		if(msg == '' || msg == null){
			$("#err_tip").html(msg_empty_msg);
			$("#msg").focus(function(){
				$("#phone").css('border','0px solid red');

				$("#username").css('border','0px solid red');
			});
			$("#msg").css('border','1px solid red');
			return false;
		}else{
			$("#msg").css('border','0px solid red');
		}
		$("#err_tip").html('');
		$("#tip").html('邮件发送中。。。');
		var url = $('#guestbook_form').attr('action');
		$.ajax({
			   type: 'POST',
			   url: url,
			   data: 'full_name='+full_name+'&phone='+phone+'&email='+email+'&msg='+msg,
			   dataType:'json',
			   success: function(data){

				   //添加样式
				   $(".submit-btn").addClass("submited")

				   $("#err_tip").html('');
				   $("#tip").html('');
				   	switch(data.status){
			        case 0:
			        	$("#err_tip").html(data.msg);			        	
			        	break;
			        case 1:			        	
			        	if(data.data.full_name == ''){
			        		$("#err_tip").html(name_empty_msg);
			        		$("#username").focus();
                            $("#username").css('border','1px solid red');
			        	}
			        	if(data.data.mobile== ''){
			        		$("#err_tip").html(phone_empty_msg);
				            $("#phone").focus();
                            $("#phone").css('border','1px solid red');
			        	}		
			        	if(data.data.msg == ''){
			        		$("#msg").html(msg_empty_msg);
			        		$("#msg").focus();
			        		$("#msg").css('border','1px solid red');
			        	}
			        	break;
			        case 2:
			        	$("#err_tip").html(data.msg);
			            $("#phone").focus();
			        	break;
			        case 3:
			        	$("#err_tip").html(data.msg);
			            $("#email").focus();
			        	break;
			        case 4:
			        	$("#err_tip").html(data.msg);
			        	break;	
			        case 5:			        	
			        	$("#username").val('');
			        	$("#phone").val('');
			        	$("#email").val('');
			        	$("#msg").val('');
			        	$("#tip").html(data.msg);
			        	break;
			    	}
			   }
		});
	 });

	//企业版计算器
	function fn_calc() {

		//计算按钮
		$("#hr-calc,#crm-calc").click(function () {
			var sum,
				year = $("#btn-year").val(),
				people = $("#btn-people").val();
			var reg = /^\+?[1-9][0-9]*$/;  //校验数字是否为非零正整数

			if(reg.test(people) == false){
				layer.tips("请输入大于0小于等于10万的正整数！","#btn-people");
			}else if (reg.test(year) == false){
				layer.tips("请输入大于0小于等于10的正整数！","#btn-year");
			}else{
				//开始计算
				if($(this).attr("id") == "hr-calc"){
					sum = 288 * people * year;
					$("#res-sum").text(sum);
					$(".res-calc").show();
				}else{
					sum = 588 * people * year;
					$("#res-sum").text(sum);
					$(".res-calc").show();
				}
			}
		})
		//增加按钮
		$(".up-arrow").click(function () {

			var year = $("#btn-year").val(),
				people = $("#btn-people").val();
			//判断Input是否为空或者0，是的话设置值为10,否则进行计算，用户数量+10，年限+1
			if($(this).parent().attr("class")=="calc-people"){ //判断按钮属于用户还是年限input
				if(people == "" || people <= 0){
					$("#btn-people").val(10);
				}else if(people >= 99990){
					$("#btn-people").val(100000);
				}else {
					$("#btn-people").val(parseInt($("#btn-people").val())+10);
				}
			}else{
				if(year == "" || year <= 0){
					$("#btn-year").val(1);
				}else{
					if(year <10) {
						$("#btn-year").val(parseInt($("#btn-year").val()) + 1);
					}
				}
			}

		});
		//减少按钮
		$(".down-arrow").click(function () {

			var year = $("#btn-year").val(),
				people = $("#btn-people").val();
			//判断Input是否为空或者0，是的话设置值为10,否则进行计算，用户数量-10，年限-1，直到0为止
			if($(this).parent().attr("class")=="calc-people"){//判断按钮属于用户还是年限input
				if(people == "" || people <= 0){
					$("#btn-people").val(0);
				}else if( people < 10){
					$("#btn-people").val(0);
				}else{
					$("#btn-people").val(parseInt($("#btn-people").val())-10);
				}
			}else{
				if(year == "" || year <= 0){
					$("#btn-year").val(0);
				}else{
					$("#btn-year").val(parseInt($("#btn-year").val())-1);
				}
			}

		});
	}
	window.onload = fn_calc;
});
