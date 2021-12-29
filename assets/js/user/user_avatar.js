// 入口函数
$(function () {
	// alert('ok');
	// 初始化图片裁剪区
	// 1.1 获取裁剪区域的 元素对象
	var $image = $('#image')
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview'
	}
	// 1.3 创建裁剪区域
	$image.cropper(options);

	// 点击上传按钮，弹出文件选择框
	$('#btnChooseImage').on('click', function () {
		// 触发文件选择框file
		$('#file').click();
	})

	// 为文件绑定change事件
	$('#file').on('change', function () {
		// console.log('ok');
		// 获取选中的文件(文件选择控件元素对象.files---文件类表)
		// var filelist=$('#file')[0].files;
		var filelist = this.files;
		console.log(filelist);
		if (filelist.length <= 0) {
			return layui.layer.msg('请选择图片!', { icon: 5 })
		}
		// 拿到用户选择的文件
		var file = filelist[0];
		// 将文件转换为路径
		// 渲染到裁剪区域
		var newImgURL = URL.createObjectURL(file);
		// 重新初始化裁剪区域
		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', newImgURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域
	})
	// 为确定按钮绑定点击事件
	$('#btnUpload').on('click',function () {
		var dataURL = $image
			.cropper('getCroppedCanvas', {
				// 创建一个 Canvas 画布
				width: 100,
				height: 100
			})
			.toDataURL('image/png')
			// 调接口
			$.ajax({
				method:'post',
				url:'/my/update/avatar',
				data:{
					avatar:dataURL
				},
				success(res){
					if (res.status!==0) {
						return layui.layer.msg(res.message,{icon:5});
					}
					layui.layer.msg(res.message, { icon: 6 });
					// 更新页面头部的头像
					window.parent.getUserInfo();
				}
			})
	})
})