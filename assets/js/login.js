$(function () {
	// console.log('ok');
	// 点击去注册
	$('#link_reg').on('click',function () {
		// console.log('ok');
		$('.reg-box').show();
		$('.login-box').hide();
	})

	// 点击去登录
	$('#link_login').on('click',function () {
		$('.reg-box').hide();
		$('.login-box').show();
	})

	// 通过form.verify()函数自定义校验规则
	layui.form.verify({
		// 自定义一个pwd的校验规则
		pwd: [/^[\S]{6,12}$/, '密码必须是6~12为，且不能出现空格'],
		// 校验两次密码是否一致的规则
		repwd: function (value, item) {
			// value 使用此规则表单元素获得的值

			// console.log(value,item);
			// 获取确认密码的值
			var pwd = $('#form_reg [name=password').val();
			if (pwd !== value) {
				return '两次密码不一致'
			}
		}
	})
	// 注册用户
	//绑定submit事件
	$('#form_reg').on('submit',function (e) {
		// 阻止默认行为
		e.preventDefault();
		// console.log('ok');
		// 收集表达数据
		var username =$('#form_reg [name=username]').val().trim();
		var password = $('#form_reg [name=password]').val().trim();
		var repassword = $('#form_reg [name=repassword]').val().trim();
		console.log(username,password,repassword);
		// 发起ajax请求
		$.ajax({
			method:'post',
			url:'/api/reguser',
			data:{
				username,
				password
			},
			success(res){
				// console.log(res);
				// 判断是否成功
				if (res.status!==0) {
					return layui.layer.msg(res.message,{icon:5})
				}
				layui.layer.msg(res.message,{icon:6},function () {
					$('#link_login').click();
				})
			}

		})
	})
	// 用户登录
	$('#form_login').on('submit',function (e) {
		// 阻止表单的默认提交
		e.preventDefault();
		// 获取表单数据
		var data=$(this).serialize();
		// console.log(data);
		$.ajax({
			method:'post',
			url:'/api/login',
			data,
			success(res){
				console.log(res);
				if (res.status!==0) {
					return layui.layer.msg(res.message,{icon:5})
				}
				layui.layer.msg(res.message,{icon:6})
				localStorage.setItem('token',res.token)
				location.href='index.html'
			}
		})

	})

})