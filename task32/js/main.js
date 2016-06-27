function addEvent(elem, type, func) {
	//兼容浏览器差异
	if (elem.addEventListener) {
		elem.addEventListener(type, func);
	} else if (elem.attachEvent) {
		elem.attachEvent("on" + type, func);
	} else {
		elem["on" + type] = func;
	}
} 
function $(id){   //getElementById好长啊，每次写好累的。
	return document.getElementById(id);
}
var check=(function(){   //将检查函数封装在这里
	var nameArr=["名称不能为空","名称不能包含除中文、英文及数字以外的字符","名称长度过短","名称长度过长","名称可用"]
	var passwordArr=["密码不能为空","密码不能包含除英文及数字以外的字符","密码长度过短","密码长度过长","密码可用"]
	var againArr=["俩次密码不相同","请正确输入第一次密码","密码正确"];
	var emailArr=["名称不能为空","邮箱格式错误","邮箱格式正确"];
	var phoneArr=["手机号码不能为空","手机号码格式错误","手机号码格式正确"]
	var nowPassword="";
	var passwordRight=false;
	function formList(name,func,rule){
			this.label=name;
			this.validator=func;
			this.rules=rule;
	}
	formList.prototype.type="input";
	formList.prototype.success="格式正确";
	formList.prototype.fail="名称不能为空";
	return {
		checkName:function (str){
			var count=0;
			if(str==="")return nameArr[0];
			else if(/[^0-9a-z\u4e00-\u9fa5]/i.test(str))return nameArr[1];
			else {
				for(var i=0;i<str.length;i++){
					if(/[a-z0-9]/i.test(str[i]))count++;
					else count+=2;
				}
				if(count<4)return nameArr[2];
				if(count>18)return nameArr[3];
			}
			return nameArr[4];
		},
		checkPassword:function(str){
			var count=0;
			passwordRight=false;
			if(str==="")return passwordArr[0];
			else if(/[^0-9a-z]/gi.test(str))return passwordArr[1];
			else {
				if(str.length<9)return passwordArr[2];
				else if(str.length>24)return passwordArr[3];
				else {
					passwordRight=true;
					nowPassword=str;
					return passwordArr[4];
				}
			}
		},
		checkAgain:function(str){
			if(passwordRight){
				if(nowPassword===str)return againArr[2];
				else return againArr[0];
			}
			else return againArr[1];
		},
		checkEmail:function(str){
			if(str==="")return emailArr[0];
			else if(/^[\w]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test(str))return emailArr[2];
			else return emailArr[1];
		},
		checkPhone:function(str){
			if(str==="")return phoneArr[0];
			else if(/^\d{11}$/.test(str))return phoneArr[2];
			else return phoneArr[1];
		}
	}
})();
//工厂在这里
function FormList(name,type,func,rules,success){
	this.label=name;
	this.type=type;
	this.validator=func;
	this.rules=rules;
	this.success=success;
};
//五个实例
var nameInput=new FormList("name","text",check.checkName,"必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符","名称可用");
var passwordInput=new FormList("password","password",check.checkPassword,"必填，长度为9~24个字符，只允许输入英文字母和数字","密码可用");
var againInput=new FormList("passwordAgain","password",check.checkAgain,"重复输入密码,俩次密码需相同","密码正确");
var emailInput=new FormList("email","text",check.checkEmail,"必填，请输入正确的邮箱地址","邮箱格式正确");
var phoneInput=new FormList("phone","text",check.checkPhone,"必填，请输入正确的手机号码","手机号码格式正确");
var labelObj={    //将英文label转化为中文
	"name":"名称",
	"password":"密码",
	"passwordAgain":"确认密码",
	"email":"电子邮箱",
	"phone":"手机号码"
}
function toString(obj){
	return "<tr><td><label for=\"" + obj.label + "\">" + labelObj[obj.label] + "</label></td><td><input type=\"" + obj.type + "\" placeholder=\"请输入" + labelObj[obj.label] + "\" id=\"" + obj.label + "\" name=\"" + obj.label + "\"><span id=\"" + obj.label + "Warn\"></span></td></tr>";
}
window.onload=function(){
	//下面获取选项，根据选项生成表单。
	var nameChose=$("nameList");
	var passwordChose=$("passwordList");
	var emailChose=$("emailList");
	var phoneChose=$("phoneList");
	var style1=$("style1");
	var style2=$("style2");
	var causeFormBtn=$("causeForm");
	var form=$("form");
	var strObj={
		0:[nameInput],
		1:[passwordInput,againInput],//密码与确认密码绑定
		2:[emailInput],
		3:[phoneInput]
	}
	addEvent(causeFormBtn,"click",btnCauseForm);
	function btnCauseForm(){     //点击按钮生成表单
		var formArr=[nameChose,passwordChose,emailChose,phoneChose];
		var str="",arr=[];
		for(var i=0;i<formArr.length;i++){
			if(formArr[i].checked)arr.push(strObj[i]);
		}
		for(var j=0;j<arr.length;j++){
			for(var k=0;k<arr[j].length;k++){
				str+=toString(arr[j][k]);
			}
		}
		if(style2.checked){
			str=str.replace(/<input/g,"<input style='width:400px;height:50px;margin-bottom:30px;display:inline-block;margin-right:10px'");
		}
		str+='<tr><td></td><td><input type="button" value="提交" id="submit"></td></tr>';
		form.innerHTML=str;
		(function(){ 
		var names=$("name");
		var nameWarn=$("nameWarn");
		var password=$("password");
		var passwordWarn=$("passwordWarn");
		var passwordAgain=$("passwordAgain")
		var againWarn=$("passwordAgainWarn");
		var email=$("email");
		var emailWarn=$("emailWarn");
		var phone=$("phone");
		var phoneWarn=$("phoneWarn");
		var submit=$("submit");
		function focusIn(input,text){
			text.style.color="#aaa";
			input.style.borderColor="#ccc";
		}
		names&&addEvent(names,"focus",function(){
			nameWarn.innerHTML="必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符";
			focusIn(names,nameWarn);
		});
		names&&addEvent(names,"blur",function(){
			nameWarn.innerHTML=check.checkName(names.value);
			if(nameWarn.innerHTML=="名称可用"){
				names.style.borderColor="#5fb844";
				nameWarn.style.color="#5fb844";
			}
			else {
				names.style.borderColor="#de0011";
				nameWarn.style.color="#de0011";
			}
		});
		password&&addEvent(password,"focus",function(){
			passwordWarn.innerHTML="必填，长度为9~24个字符，只允许输入英文字母和数字"
			focusIn(password,passwordWarn);
		});
		password&&addEvent(password,"blur",function(){
			passwordWarn.innerHTML=check.checkPassword(password.value);
			if(passwordWarn.innerHTML=="密码可用"){
				password.style.borderColor="#5fb844";
				passwordWarn.style.color="#5fb844";
			}
			else {
				password.style.borderColor="#de0011";
				passwordWarn.style.color="#de0011";
			}
		});
		passwordAgain&&addEvent(passwordAgain,"focus",function(){
			againWarn.innerHTML="请再次输入密码";
			focusIn(passwordAgain,againWarn);
		});
		passwordAgain&&addEvent(passwordAgain,"blur",function(){
			againWarn.innerHTML=check.checkAgain(passwordAgain.value);
			if(againWarn.innerHTML=="密码正确"){
				passwordAgain.style.borderColor="#5fb844";
				againWarn.style.color="#5fb844";
			}
			else {
				passwordAgain.style.borderColor="#de0011";
				againWarn.style.color="#de0011";
			}
		});
		email&&addEvent(email,"focus",function(){
			emailWarn.innerHTML="必填，请输入正确的邮箱地址";
			focusIn(email,emailWarn);
		});
		email&&addEvent(email,"blur",function(){
			emailWarn.innerHTML=check.checkEmail(email.value);
			if(emailWarn.innerHTML=="邮箱格式正确"){
				email.style.borderColor="#5fb844";
				emailWarn.style.color="#5fb844";
			}
			else {
				email.style.borderColor="#de0011";
				emailWarn.style.color="#de0011";
			}
		});
		phone&&addEvent(phone,"focus",function(){
			phoneWarn.innerHTML="必填，请输入正确的手机号码";
			focusIn(phone,phoneWarn);
		});
		phone&&addEvent(phone,"blur",function(){
			phoneWarn.innerHTML=check.checkPhone(phone.value);
			if(phoneWarn.innerHTML=="手机号码格式正确"){
				phone.style.borderColor="#5fb844";
				phoneWarn.style.color="#5fb844";
			}
			else {
				phone.style.borderColor="#de0011";
				phoneWarn.style.color="#de0011";
			}
		});
		addEvent(submit,"click",function(){
			if((!names||names.style.borderColor=="rgb(95, 184, 68)")&&(!password||password.style.borderColor=="rgb(95, 184, 68)")&&(!passwordAgain||passwordAgain.style.borderColor=="rgb(95, 184, 68)")&&(!email||email.style.borderColor=="rgb(95, 184, 68)")&&(!phone||phone.style.borderColor=="rgb(95, 184, 68)")){
				alert("提交成功");
			}
			else alert("输入有误");
		})
	})();
	}
}