$(function () {
	getUserInfo();
	

	// 退出登录
	$('#logout').on('click',function () {
		layui.layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
			//do something
			// 清空本地存储
			localStorage.removeItem('token')
			location.href='/login.html'
			layer.close(index);
		});
	})

})
function getUserInfo() {
	$.ajax({
		method: 'get',
		url: '/my/userinfo',
		success(res) {
			console.log(res);
			if (res.status !== 0) {
				return layui.layer.msg(res.message, { icon: 5 });
			}
			renderAvatar(res.data);
		}
	})
}

function renderAvatar(user) {
	console.log(user);
	var name = user.nickname || user.username;
	console.log(name);
	$('#welcome').html('欢迎&nbsp;&nbsp;' + name);

	if (user.user_pic !== null) {
		$('.layui-nav-img').show().attr('src', user.user_pic);
		$('.text-avatar').hide();
	} else {
		$('.layui-nav-img').hide();
		var first = name[0].toUpperCase();
		$('.text-avatar').show().html(first);
	}
}