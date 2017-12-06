/**
 * 
 */

$(document).ready(function() {	
	$('a.page-link').on('click', function(e) {
		var $li = $(this).closest('ul').children();
		
		$.each($li, function(i, elem) {
			$(elem).removeClass('active');
		});
		
/*		if($(this).hasClass('pagenum')) {
			$(this).parent().addClass('active');
		}*/
	});
	
	$('#insertBtn').on('click', function(e) {
		location.href = '/notice/insert';
	});
	
	init();
});

function init() {
	selectCurrentPage();
	pageBtn();
}

function selectCurrentPage() {
	var page = parseInt($('#page').val());
	var divNum = parseInt($('#divNum').val());
	var pageSize = parseInt($('#pageSize').val());
	var index = page - (divNum * pageSize) + 1;
	
	if(index == 0) {
		index = page;
	}
	
	var curLi = $('ul.pagination').children()[index];
	$(curLi).addClass('active');
}

function pageBtn() {
	var startPageLi = $('ul.pagination').children()[1];
	var startPageNum = parseInt($(startPageLi).children().text());
	var $previous = $('#previous');
	
	if(parseInt($('#firstPage').val()) == startPageNum) {
		$previous.addClass('disabled');
		$previous.children().attr('href', '#');
	} else {
		$previous.removeClass('disabled');	
		var url = '/notice/list?page=' + (startPageNum - 2) + '&size=' + $('#pageSize').val() + '&sort=createDt,desc';
		$previous.children().attr('href', url);
	}
	
	var endPageLi = $('ul.pagination').children()[$('ul.pagination').children().length - 2];
	var endPageNum = parseInt($(endPageLi).children().text());
	var $next = $('#next');
	
	if(parseInt($('#totalPages').val()) == endPageNum) {
		$next.addClass('disabled');
		$next.children().attr('href', '#');
	} else {
		$next.removeClass('disabled');
		var url = '/notice/list?page=' + endPageNum + '&size=' + $('#pageSize').val() + '&sort=createDt,desc';
		$next.children().attr('href', url);
	}
}