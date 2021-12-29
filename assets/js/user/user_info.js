// 入口函数
$(function () {
	// alert('ok');
	// 获取用户信息，渲染都表单中
	initUserInfo();

	// 封装一个获取用户的信息
	function initUserInfo() {
		$.ajax({
			method: 'get',
			url: '/my/userinfo',
			success(res) {
				console.log(res);
				// 判断
				if (res.status !== 0) {
					return layui.layer.msg(res.message,{icon:5})
				}
				// 渲染数据到表单中
				// $('input[name=username').val(res.data.username)
				// $('input[name=nickname').val(res.data.nickname)
				// $('input[name=email').val(res.data.email)
				// 一键表单数据
				layui.form.val('formUserInfo',res.data);
			}
		})
	}
	 layui.form.verify({
		 nickname:function (value) {
			if (value.length>6) {
				return '昵称的长度必须在1~6位字符!'
			}
		 }
	 })
	//  完成用户信息修改
	$('form').on('submit',function (e) {
		e.preventDefault();
		var data =$(this).serialize()
		console.log(data);
		// 校验数据
		$.ajax({
			method:'post',
			url:'/my/userinfo',
			data:data,
			success(res){
				console.log(res);
				if (res.status!==0) {
					return layui.layer.msg(res.message,{icon:5})
				}
				layui.layer.msg(res.message,{icon:6});
				window.parent.getUserInfo();
			}
		})
	})

	// 重置表单中的用户信息（恢复内容）
	$('#btnReset').on('click',function (e) {
		// 阻止重置按钮清空表单的默认行为
		e.preventDefault();

		// 重新获取用户信息 重新渲染
		initUserInfo();
	})
})