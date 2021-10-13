
			var modal = (function(){
				var method = {}, $overlay, $modal, $content, $close;

				// center modal in the viewport //
				method.center = function () {
					var left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
					$modal.css({
						left:left + $(window).scrollLeft(),
						top:10 + $(window).scrollTop()
					});
				};

				// open modal //
				method.open = function (settings) {
					$content.empty().append(settings.content);
					method.center();
					$(window).bind('resize.modal', method.center);
					$modal.show();
					$overlay.show();
				};

				// close modal //
				method.close = function () {
					$modal.hide();
					$overlay.hide();
					$content.empty();
					$(window).unbind('resize.modal');
				};

				// generate HTML, add it to the document //
				$overlay = $('<div id="overlay"></div>');
				$modal = $('<div id="modal"></div>');
				$content = $('<div id="content"></div>');
				$modal.hide();
				$overlay.hide();
				$modal.append($content);

				$(document).ready(function(){
					$('body').append($overlay, $modal);						
				});
				
				$overlay.click(function(e){
					e.preventDefault();
					method.close();
				});

				return method;
			}());
			
			function openModal(e, modalContent)
			{
					modal.open({content: modalContent});
					e.preventDefault();
			}