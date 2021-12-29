$(function () {
	layui.form.verify({
		pwd: [
			/^\S{6,12}$/,
			'密码必须是6~12为，且不能出现空格'
		],
		// 新密码不能和原密码一样
		samePwd: function (value) {
			var oldPwd = $('input[name=oldPwd]').val()
			if (value === oldPwd) {
				return '新旧密码不能相同!'
			}
		},
		// 确认新密码必须和新密码一致
		repwd: function (value) {
			var newPwd = $('input[name=newPwd]').val();
			if (value !== newPwd) {
				return '两次密码不一致!'
			}
		}
	})
	$('form').on('submit', function (e) {
		e.preventDefault();
		var data = $(this).serialize();
		console.log(data);
		// 调接口
		$.ajax({
			method: 'post',
			url: '/my/updatepwd',
			data,
			success(res) {
				if (res.status !== 0) {
					return layui.layer.msg(res.message, { icon: 5 })
				}
				layui.layer.msg(res.message, { icon: 6 });
				// 清空表单
				// 方式1：触发重置按钮的click事件
				// $('button[type=reset]').click();
				// 方式2：调用表单对象（dom元素）的reset()方法
				$('form')[0].reset();

			}
		})
	})
})