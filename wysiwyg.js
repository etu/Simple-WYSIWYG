(function($) {
	$.widget("ui.wysiwyg", {
		options: {
			toolbar: true
		}, 
		_create: function() {
			var self  = this.element;
			self.addClass("ui-widget ui-widget-wysiwyg").hide();
			
			var value = self.val();
			var canvas = this.canvas = $("<div></div>").insertAfter(self).html(value).addClass("ui-widget ui-widget-wysiwyg")
				.attr({contenteditable: true, hideFocus: true, id: self.attr("id")+"_canvas"});
			
			// Cleanerfunction to remove/add <br(| /)> and to remove <div></div> in chrom(e|ium)
			function clean(str, mode) {
				if(mode == 'add') {
					str = str.replace(/\n/g, '<br />');
				}
				if(mode == 'clear') {
					str = str.replace(/<br>/g, '\n');
					str = str.replace(/<div>/g, '\n');
					str = str.replace(/<\/div>/g, '');
				}
				return str;
			}
			
			$(canvas).keyup(function() {
				var c = $(this).html();
				c = clean(c, 'clear');
				self.val(c);
			});
			$(self).keyup(function() {
				var c = $(this).val();
				c = clean(c, 'add');
				canvas.html(c);
			});
			
			var isCtrl = false;
			$(document).keyup(function (e) {
				if(e.which == 17) isCtrl = false;
			}).keydown(function (e) {
				if(e.which == 17) isCtrl = true;
				if(e.which == 66 && isCtrl == true) {
					doBold();
					return false;
				}
				if(e.which == 73 && isCtrl == true) {
					doItalic();
					return false;
				}
				if(e.which == 85 && isCtrl == true) {
					doUnderline();
					return false;
				}
			});
			
			if(this.options.toolbar) {
				var toolbar = $("<div></div>").insertBefore(self).addClass("ui-widget ui-toolbar")
					.attr({id: self.attr("id") + "_toolbar"});
				var buttons = [
					[
						{label: "B", style: "font-weight: bold;", name: 'bold', title: 'Bold (Ctrl + B)'},
						{label: "I", style: "font-style: italic;", name: 'italic', title: 'Italic (Ctrl + I)'},
						{label: "U", style: "text-decoration: underline;", name: 'underline', title: 'Underline (Ctrl + U)'}
					],[
						{label: "HTML", style: "float: right;", name: 'html', title: ''}
					]
				];
				
				for(var i = 0; i < buttons.length; i++) {
					for(var j = 0; j < buttons[i].length; j++) {
						var contents = '<button id="ui_toolbar_button_' + buttons[i][j].name + '" style="'
							+ buttons[i][j].style + '" title="' + buttons[i][j].title + '">' + buttons[i][j].label + '</button>';
						
						toolbar.html(toolbar.html() + contents);
					}
					var num = j - 1;
					
					toolbar.html(toolbar.html() + '<span class="ui-separator" style="' + buttons[i][num].style + '"></span>');
 				}
				toolbar.buttonset();
				
				$("#ui_toolbar_button_html").click(function () {
					self.toggle();
					canvas.toggle();
				});
				$("#ui_toolbar_button_bold").click(function () {
					doBold();
				});
				$("#ui_toolbar_button_italic").click(function () {
					doItalic();
				});
				$("#ui_toolbar_button_underline").click(function () {
					doUnderline();
				});
				
				function doBold() {
					document.execCommand('bold', false, null);
					canvas.trigger('keyup');
				}
				function doItalic() {
					document.execCommand('italic', false, null);
					canvas.trigger('keyup');
				}
				function doUnderline() {
					document.execCommand('underline', false, null);
					canvas.trigger('keyup');
				}
			}
		}, 
		_destroy: function() {
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);
