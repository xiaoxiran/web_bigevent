// ajax的预处理函数
$.ajaxPrefilter(function (options) {
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

	// 统一为有权限的接口
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token') || ''
		}

	}


	// 设置权限
	options.complate=function (xhr) {
		console.log(xhr);
		if (xhr.responseJSON.status === 1 || xhr.responseJSON.message==='身份认证失败！') {
			// 清除token并且跳转到登录页面
			localStorage.removeItem('token');
			location.href='login.html'
		}
	}




})