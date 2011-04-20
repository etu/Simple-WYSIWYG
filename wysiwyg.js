(function($) {
	$.widget("ui.wysiwyg", {
		options: {
			toolbar: true,
		}, 
		_create: function() {
			var self = this.element;
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
			
			if(this.options.toolbar) {
				var toolbar = $("<div></div>").insertBefore(self).addClass("ui-widget ui-toolbar")
					.attr({id: self.attr("id") + "_toolbar"});
				var buttons = [{label: "Bold", style: "font-weight: bold;", name: 'bold'},
							   {label: "Italic", style: "font-style:  italic;", name: 'italic'},
							   {label: "Underline", style: "text-decoration: underline;", name: 'underline'},
							   {label: "HTML", style: "", name: "html"}];
			
				for(var i = 0; i < buttons.length; i++) {
					var contents = '<input type="button" id="ui_toolbar_button_' + buttons[i].name + '" value="' + buttons[i].label + '" style="' + buttons[i].style + '" />';
					contents    += '<span class="ui-separator"></span>';
					
					toolbar.html(toolbar.html() + contents);
					//toolbar.buttonset();
				}
				
				$("#ui_toolbar_button_html").click(function () {
					self.toggle();
					canvas.toggle();
				});
				
				$("#ui_toolbar_button_bold").click(function () {
					applyTags('<strong>', '</strong>');
				});
				$("#ui_toolbar_button_italic").click(function () {
					applyTags('<em>', '</em>');
				});
				$("#ui_toolbar_button_underline").click(function () {
					applyTags('<u>', '</u>');
				});
			}
			
			function applyTags(tag1, tag2) {
				var sel = window.getSelection();
				console.log(sel);
			}
		}, 
		_destroy: function() {
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);

