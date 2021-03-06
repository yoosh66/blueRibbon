/**
 * 
 */

$(document).ready(function() {
	$('#summernote').summernote({
		lang: 'ko-KR',
		height: 300,
		minHeight: 350,
		maxHeight: null,
		dialogsFade: true,
		focus: false,
		toolbar: [
			// [groupName, [list of button]]
			['style', ['bold', 'italic', 'underline', 'clear']],
			['font', ['strikethrough', 'superscript', 'subscript']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['insert', ['table', 'picture', 'link', 'video']]
		],
		callbacks: {
			onImageUpload: function(files) {
				for(var i = files.length - 1; i >= 0; i--) {
					var type = files[i].type;
					var name = files[i].name;
					var extension = name.substr(name.lastIndexOf('.') + 1, name.length - 1);
					var size = files[i].size;
					
					if(validImage(type, extension, size)) {
						uploadImage(files[i]);
					}
				}
			}
		}
	});
	
	$('#title').focus();
	
	$('#listBtn').on('click', function(e) {
		history.back();
	});
	
	$('#updateBtn').on('click', function(e) {
		valid();
	});
});

function validImage(type, extension, size) {
	if(type.indexOf('image') < 0) {
		alert('사진파일만 업로드 가능합니다.');
		return false;
	}
	
	if(extension != 'png' && extension != 'jpg' && extension != 'gif') {
		alert('확장자가 png, jpg, gif인 파일만 업로드 가능합니다.');
		return false;
	}
	
	if((size / 1024 / 1024) > 20) {
		alert('업로드는 20MB까지 가능합니다.');
		return false;
	}
	
	return true;
}

function uploadImage(file) {
    var form_data = new FormData();
    form_data.append('file', file);
    
	$.ajax({
		data: form_data,
		type: 'POST',
		url: '/notice/uploadImage',
		cache: false,
		contentType: false,
		enctype: 'multipart/form-data',
		processData: false,
		success: function(rJson) {
			console.log(rJson);
			if(rJson.success) {
				$('#summernote').summernote('insertImage', rJson.url);
			} else {
				alert(rJson.msg);
			}
		}
	});
}

function valid() {
	if($('#title').val() == '') {
		alert('제목을 입력해 주세요.');
		return;
	}
	
	if($('#title').text().length > 100) {
		alert('제목은 100자 이하로 입력해 주세요.');
		return;
	}
	
	if($('#summernote').summernote('isEmpty')) {
		alert('내용을 입력해 주세요.');
		return;
	}
	
	update();
}

function update() {
	var url = '/notice/updateProc.json';
	var noticeId = $('#noticeId').val();
	var params = {
		noticeId: noticeId,
		title: $('#title').val(),
		contents: $('#summernote').summernote('code'),
		userId: $('#userId').val(),
		userName: $('#userName').val()
	};
	
	$.post(url, params, function(rJson) {
		if(rJson.success == undefined) {
			alert('로그인이 필요합니다.');
			location.href = '/login/';
		} else {
			alert(rJson.msg);
			
			if(rJson.success) {
				location.href = rJson.url;
			}
		}
	});
}