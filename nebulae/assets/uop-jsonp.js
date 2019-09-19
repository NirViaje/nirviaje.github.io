var uop_horizontal_indent = 60;
var uop_vertical_indent = 60;
var uop_active_element = "";
var uop_displayed = false;
var uop_subscribing = false;
var uop_initialized = false;
var uop_panel_id = '';
var uop_cookie_value;
var uop_onload_enable;
var uop_onload_delay;
var uop_success_close_enable;
var uop_success_close_delay;
var uop_remember_state;

var uop_baseurl = (function() {
	var re = new RegExp('js/uop-jsonp(\.min)?\.js.*'),
	scripts = document.getElementsByTagName('script');
	for (var i = 0, ii = scripts.length; i < ii; i++) {
		var path = scripts[i].getAttribute('src');
		if(re.test(path)) return path.replace(re, '');
	}
})();
var uop_ajax_url = uop_baseurl + "ajax.php";

function uop_init() {
	if (uop_initialized) return;
	uop_initialized = true;
	var force_blocked = 0;
	var str_id = decodeURIComponent((new RegExp('[?|&]uop=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	if (!str_id) {
		if (typeof uop_custom_panel !== 'undefined') str_id = uop_custom_panel;
		else str_id = '';
	} else {
		force_blocked = 1;
	}
	jQuery.ajax({
		url: uop_ajax_url, 
		data: {
			action: "get-data",
			force_blocked: force_blocked,
			uop: str_id
		},
		dataType: "jsonp",
		success: function(data) {
			//alert(data.html);
			try {
				if (data.status == "OK") {
					uop_cookie_value = data.cookie_value;
					uop_onload_enable = data.onload_enable;
					uop_onload_delay = 1000*parseInt(data.onload_delay, 10);
					uop_success_close_enable = data.success_close_enable;
					uop_success_close_delay = 1000*parseInt(data.success_close_delay, 10);
					uop_remember_state = data.remember_state;
					uop_panel_id = data.panel_id;
					jQuery('body').append(data.html);
					jQuery(window).resize(function() {
						if (uop_active_element == "tab") uop_tab_position();
						else if (uop_active_element == "panel") uop_panel_position();
					});
					uop_start();
				}
			} catch(error) {
				alert(error);
			}
		}
	});
}

function uop_start() {
	var uop_state = uop_read_cookie("uop-state");
	if (uop_remember_state == "on" && uop_state == "tab") uop_show_tab();
	else if (uop_remember_state == "on" && uop_state == "panel") uop_show_panel();
	else {
		var uop_subscribed = uop_read_cookie("uop-subscribed");
		if (uop_subscribed == uop_cookie_value) uop_show_tab();
		else {
			if (uop_onload_enable == "on") {
				if (uop_onload_delay == 0) uop_show_panel();
				else {
					uop_show_tab();
					setTimeout(function() {
						if (!uop_displayed) uop_show_panel();
					}, uop_onload_delay);
				}
			} else uop_show_tab();
		}
	}
}

function uop_show_tab() {
	if (uop_active_element == "panel") {
		var viewport = {
			width: Math.max(240, jQuery(window).width()),
			height: Math.max(240, jQuery(window).height())
		};
		var panel = jQuery(".uop-panel");
		var panel_width = parseInt(jQuery(panel).width(), 10);
		var panel_height = parseInt(jQuery(panel).height(), 10);
		var panel_property;
		
		if (jQuery(panel).hasClass("uop-panel-bottom-left") || jQuery(panel).hasClass("uop-panel-bottom-center") || jQuery(panel).hasClass("uop-panel-bottom-right")) {
			panel_property = {"bottom" : "-"+panel_height+"px"};
		} else if (jQuery(panel).hasClass("uop-panel-top-left") || jQuery(panel).hasClass("uop-panel-top-center") || jQuery(panel).hasClass("uop-panel-top-right")) {
			panel_property = {"top" : "-"+panel_height+"px"};
		} else if (jQuery(panel).hasClass("uop-panel-left-top") || jQuery(panel).hasClass("uop-panel-left-middle") || jQuery(panel).hasClass("uop-panel-left-bottom")) {
			panel_property = {"left" : "-"+panel_width+"px"};
		} else if (jQuery(panel).hasClass("uop-panel-right-top") || jQuery(panel).hasClass("uop-panel-right-middle") || jQuery(panel).hasClass("uop-panel-right-bottom")) {
			panel_property = {"right" : "-"+panel_width+"px"};
		}
		jQuery(panel).animate(panel_property, 300, function() {
			var intro_encoded = jQuery(".uop-content-prefix").attr("data-base64");
			var outro_encoded = jQuery(".uop-content-suffix").attr("data-base64");
			if (intro_encoded) {
				jQuery(".uop-content-prefix").html(uop_encode64(jQuery(".uop-content-prefix").html()));
			}
			if (outro_encoded) {
				jQuery(".uop-content-suffix").html(uop_encode64(jQuery(".uop-content-suffix").html()));
			}
			_uop_show_tab();
		});
	} else if (uop_active_element != "tab") {
		_uop_show_tab();
	}
}
function _uop_show_tab() {
	if (uop_remember_state == "on") uop_write_cookie("uop-state", "tab", 180);
	jQuery(".uop-panel").hide();
	var tab = jQuery(".uop-tab");
	uop_tab_position();
	var tab_width = parseInt(jQuery(tab).width(), 10);
	var tab_height = parseInt(jQuery(tab).height(), 10);
	jQuery(tab).show();
	uop_active_element = "tab";
	if (jQuery(tab).hasClass("uop-tab-bottom-left") || jQuery(tab).hasClass("uop-tab-bottom-center") || jQuery(tab).hasClass("uop-tab-bottom-right") || jQuery(tab).hasClass("uop-tab-image-bottom-left") || jQuery(tab).hasClass("uop-tab-image-bottom-center") || jQuery(tab).hasClass("uop-tab-image-bottom-right")) {
		jQuery(tab).css({"bottom" : "-"+tab_height+"px"});
		jQuery(tab).animate({"bottom" : "0px"}, 100);
	} else if (jQuery(tab).hasClass("uop-tab-top-left") || jQuery(tab).hasClass("uop-tab-top-center") || jQuery(tab).hasClass("uop-tab-top-right") || jQuery(tab).hasClass("uop-tab-image-top-left") || jQuery(tab).hasClass("uop-tab-image-top-center") || jQuery(tab).hasClass("uop-tab-image-top-right")) {
		jQuery(tab).css({"top" : "-"+tab_height+"px"});
		jQuery(tab).animate({"top" : "0px"}, 100);
	} else if (jQuery(tab).hasClass("uop-tab-left-top") || jQuery(tab).hasClass("uop-tab-left-middle") || jQuery(tab).hasClass("uop-tab-left-bottom")) {
		jQuery(tab).css({"left" : "-"+tab_height+"px"});
		jQuery(tab).animate({"left" : "0px"}, 100);
	} else if (jQuery(tab).hasClass("uop-tab-right-top") || jQuery(tab).hasClass("uop-tab-right-middle") || jQuery(tab).hasClass("uop-tab-right-bottom")) {
		jQuery(tab).css({"right" : "-"+tab_height+"px"});
		jQuery(tab).animate({"right" : "0px"}, 100);
	} else if (jQuery(tab).hasClass("uop-tab-image-left-top") || jQuery(tab).hasClass("uop-tab-image-left-middle") || jQuery(tab).hasClass("uop-tab-image-left-bottom")) {
		jQuery(tab).css({"left" : "-"+tab_width+"px"});
		jQuery(tab).animate({"left" : "0px"}, 100);
	} else if (jQuery(tab).hasClass("uop-tab-image-right-top") || jQuery(tab).hasClass("uop-tab-image-right-middle") || jQuery(tab).hasClass("uop-tab-image-right-bottom")) {
		jQuery(tab).css({"right" : "-"+tab_width+"px"});
		jQuery(tab).animate({"right" : "0px"}, 100);
	}
}
function uop_tab_position() {
	var viewport = {
		width: Math.max(240, jQuery(window).width()),
		height: Math.max(240, jQuery(window).height())
	};
	var tab = jQuery(".uop-tab");
	var tab_width = parseInt(jQuery(tab).width(), 10);
	var tab_height = parseInt(jQuery(tab).height(), 10);
	if (jQuery(tab).hasClass("uop-tab-bottom-left") || jQuery(tab).hasClass("uop-tab-top-left") || jQuery(tab).hasClass("uop-tab-image-bottom-left") || jQuery(tab).hasClass("uop-tab-image-top-left")) {
		if (tab_width + uop_horizontal_indent >= viewport.width - uop_horizontal_indent) jQuery(tab).css({"left" : "0px"});
		else jQuery(tab).css({"left" : uop_horizontal_indent+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-bottom-center") || jQuery(tab).hasClass("uop-tab-top-center") || jQuery(tab).hasClass("uop-tab-image-bottom-center") || jQuery(tab).hasClass("uop-tab-image-top-center")) {
		if (tab_width >= viewport.width) jQuery(tab).css({"left" : "0px"});
		else jQuery(tab).css({"left" : parseInt((viewport.width-tab_width)/2, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-bottom-right") || jQuery(tab).hasClass("uop-tab-top-right") || jQuery(tab).hasClass("uop-tab-image-bottom-right") || jQuery(tab).hasClass("uop-tab-image-top-right")) {
		if (tab_width + uop_horizontal_indent >= viewport.width - uop_horizontal_indent) jQuery(tab).css({"left" : parseInt((viewport.width - tab_width), 10)+"px"});
		else jQuery(tab).css({"left" : parseInt((viewport.width - tab_width - uop_horizontal_indent), 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-right-top")) {
		if (tab_width + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : "-"+tab_height+"px"});
		else jQuery(tab).css({"top" : parseInt(uop_vertical_indent - tab_height, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-right-middle")) {
		if (tab_width >= viewport.height) jQuery(tab).css({"top" : "-"+tab_height+"px"});
		else jQuery(tab).css({"top" : parseInt((viewport.height-tab_width)/2 - tab_height, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-right-bottom")) {
		if (tab_width + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : parseInt(viewport.height - tab_width - tab_height, 10)+"px"});
		else jQuery(tab).css({"top" : parseInt(viewport.height - tab_width - uop_vertical_indent, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-left-top")) {
		if (tab_width + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : tab_width+"px"});
		else jQuery(tab).css({"top" : parseInt(uop_vertical_indent + tab_width, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-left-middle")) {
		if (tab_width >= viewport.height) jQuery(tab).css({"top" : "0px"});
		else jQuery(tab).css({"top" : parseInt((viewport.height-tab_width)/2 + tab_width, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-left-bottom")) {
		if (tab_width + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : viewport.height+"px"});
		else jQuery(tab).css({"top" : parseInt(viewport.height - uop_vertical_indent, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-image-left-top") || jQuery(tab).hasClass("uop-tab-image-right-top")) {
		if (tab_height + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : "0px"});
		else jQuery(tab).css({"top" : uop_vertical_indent+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-image-left-middle") || jQuery(tab).hasClass("uop-tab-image-right-middle")) {
		if (tab_height >= viewport.height) jQuery(tab).css({"top" : "0px"});
		else jQuery(tab).css({"top" : parseInt((viewport.height-tab_height)/2, 10)+"px"});
	} else if (jQuery(tab).hasClass("uop-tab-image-left-bottom") || jQuery(tab).hasClass("uop-tab-image-right-bottom")) {
		if (tab_height + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(tab).css({"top" : parseInt(viewport.height - tab_height, 10)+"px"});
		else jQuery(tab).css({"top" : parseInt(viewport.height - tab_height - uop_vertical_indent, 10)+"px"});
	}
}

function uop_show_panel() {
	uop_displayed = true;
	if (uop_remember_state == "on") uop_write_cookie("uop-state", "panel", 180);
	
	if (uop_active_element == "tab") {
		var viewport = {
			width: Math.max(240, jQuery(window).width()),
			height: Math.max(240, jQuery(window).height())
		};
		var tab = jQuery(".uop-tab");
		var tab_width = parseInt(jQuery(tab).width(), 10);
		var tab_height = parseInt(jQuery(tab).height(), 10);
		var tab_property;
		
		if (jQuery(tab).hasClass("uop-tab-bottom-left") || jQuery(tab).hasClass("uop-tab-bottom-center") || jQuery(tab).hasClass("uop-tab-bottom-right") || jQuery(tab).hasClass("uop-tab-image-bottom-left") || jQuery(tab).hasClass("uop-tab-image-bottom-center") || jQuery(tab).hasClass("uop-tab-image-bottom-right")) {
			tab_property = {"bottom" : "-"+tab_height+"px"};
		} else if (jQuery(tab).hasClass("uop-tab-top-left") || jQuery(tab).hasClass("uop-tab-top-center") || jQuery(tab).hasClass("uop-tab-top-right") || jQuery(tab).hasClass("uop-tab-image-top-left") || jQuery(tab).hasClass("uop-tab-image-top-center") || jQuery(tab).hasClass("uop-tab-image-top-right")) {
			tab_property = {"top" : "-"+tab_height+"px"};
		} else if (jQuery(tab).hasClass("uop-tab-left-top") || jQuery(tab).hasClass("uop-tab-left-middle") || jQuery(tab).hasClass("uop-tab-left-bottom")) {
			tab_property = {"left" : "-"+tab_height+"px"};
		} else if (jQuery(tab).hasClass("uop-tab-right-top") || jQuery(tab).hasClass("uop-tab-right-middle") || jQuery(tab).hasClass("uop-tab-right-bottom")) {
			tab_property = {"right" : "-"+tab_height+"px"};
		} else if (jQuery(tab).hasClass("uop-tab-image-left-top") || jQuery(tab).hasClass("uop-tab-image-left-middle") || jQuery(tab).hasClass("uop-tab-image-left-bottom")) {
			tab_property = {"left" : "-"+tab_width+"px"};
		} else if (jQuery(tab).hasClass("uop-tab-image-right-top") || jQuery(tab).hasClass("uop-tab-image-right-middle") || jQuery(tab).hasClass("uop-tab-image-right-bottom")) {
			tab_property = {"right" : "-"+tab_width+"px"};
		}
		jQuery(tab).animate(tab_property, 100, function() {
			_uop_show_panel();
		});
	} else {
		_uop_show_panel();
	}
}
function _uop_show_panel() {
	jQuery(".uop-tab").hide();
	var panel = jQuery(".uop-panel");
	var intro_encoded = jQuery(".uop-content-prefix").attr("data-base64");
	var outro_encoded = jQuery(".uop-content-suffix").attr("data-base64");
	if (intro_encoded) {
		jQuery(".uop-content-prefix").html(uop_decode64(jQuery(".uop-content-prefix").html()));
	}
	if (outro_encoded) {
		jQuery(".uop-content-suffix").html(uop_decode64(jQuery(".uop-content-suffix").html()));
	}
	uop_panel_position();
	var panel_width = parseInt(jQuery(panel).width(), 10);
	var panel_height = parseInt(jQuery(panel).height(), 10);
	jQuery(panel).show();
	uop_active_element = "panel";
	if (jQuery(panel).hasClass("uop-panel-bottom-left") || jQuery(panel).hasClass("uop-panel-bottom-center") || jQuery(panel).hasClass("uop-panel-bottom-right")) {
		jQuery(panel).css({"bottom" : "-"+panel_height+"px"});
		jQuery(panel).animate({"bottom" : "0px"}, 300);
	} else if (jQuery(panel).hasClass("uop-panel-top-left") || jQuery(panel).hasClass("uop-panel-top-center") || jQuery(panel).hasClass("uop-panel-top-right")) {
		jQuery(panel).css({"top" : "-"+panel_height+"px"});
		jQuery(panel).animate({"top" : "0px"}, 300);
	} else if (jQuery(panel).hasClass("uop-panel-left-top") || jQuery(panel).hasClass("uop-panel-left-middle") || jQuery(panel).hasClass("uop-panel-left-bottom")) {
		jQuery(panel).css({"left" : "-"+panel_width+"px"});
		jQuery(panel).animate({"left" : "0px"}, 300);
	} else if (jQuery(panel).hasClass("uop-panel-right-top") || jQuery(panel).hasClass("uop-panel-right-middle") || jQuery(panel).hasClass("uop-panel-right-bottom")) {
		jQuery(panel).css({"right" : "-"+panel_width+"px"});
		jQuery(panel).animate({"right" : "0px"}, 300);
	}
}
function uop_panel_position() {
	var viewport = {
		width: Math.max(240, jQuery(window).width()),
		height: Math.max(240, jQuery(window).height())
	};
	var panel = jQuery(".uop-panel");
	
	var panel_width = parseInt(jQuery(panel).attr("data-width"), 10);
	if (panel_width > viewport.width) {
		panel_width = viewport.width;
		jQuery(panel).width(panel_width);
	}
	jQuery(panel).css({"height" : "auto", "width" : panel_width+"px"});
	jQuery(".uop-panel-content").css({"height" : "auto"});
	var panel_height = parseInt(jQuery(panel).height(), 10);
	if (panel_height > viewport.height) {
		panel_height = viewport.height;
		jQuery(panel).height(panel_height);
		jQuery(".uop-panel-content").height(panel_height-30);
		jQuery(".uop-panel-content").perfectScrollbar({suppressScrollX: true});
	} else {
		jQuery(".uop-panel-content").perfectScrollbar("destroy");
	}
	
	if (jQuery(panel).hasClass("uop-panel-bottom-left") || jQuery(panel).hasClass("uop-panel-top-left")) {
		if (panel_width + uop_horizontal_indent >= viewport.width - uop_horizontal_indent) jQuery(panel).css({"left" : "0px"});
		else jQuery(panel).css({"left" : uop_horizontal_indent+"px"});
	} else if (jQuery(panel).hasClass("uop-panel-bottom-center") || jQuery(panel).hasClass("uop-panel-top-center")) {
		if (panel_width >= viewport.width) jQuery(panel).css({"left" : "0px"});
		else jQuery(panel).css({"left" : parseInt((viewport.width-panel_width)/2, 10)+"px"});
	} else if (jQuery(panel).hasClass("uop-panel-bottom-right") || jQuery(panel).hasClass("uop-panel-top-right")) {
		if (panel_width + uop_horizontal_indent >= viewport.width - uop_horizontal_indent) jQuery(panel).css({"left" : parseInt((viewport.width - panel_width), 10)+"px"});
		else jQuery(panel).css({"left" : parseInt((viewport.width - panel_width - uop_horizontal_indent), 10)+"px"});
	} else if (jQuery(panel).hasClass("uop-panel-left-top") || jQuery(panel).hasClass("uop-panel-right-top")) {
		if (panel_height + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(panel).css({"top" : "0px"});
		else jQuery(panel).css({"top" : uop_vertical_indent+"px"});
	} else if (jQuery(panel).hasClass("uop-panel-left-middle") || jQuery(panel).hasClass("uop-panel-right-middle")) {
		if (panel_height >= viewport.height) jQuery(panel).css({"top" : "0px"});
		else jQuery(panel).css({"top" : parseInt((viewport.height-panel_height)/2, 10)+"px"});
	} else if (jQuery(panel).hasClass("uop-panel-left-bottom") || jQuery(panel).hasClass("uop-panel-right-bottom")) {
		if (panel_height + uop_vertical_indent >= viewport.height - uop_vertical_indent) jQuery(panel).css({"top" : parseInt(viewport.height - panel_height, 10)+"px"});
		else jQuery(panel).css({"top" : parseInt(viewport.height - panel_height - uop_vertical_indent, 10)+"px"});
	}
}

function uop_subscribe() {
	if (uop_subscribing) return false;
	uop_subscribing = true;
	jQuery(".uop-input-error").removeClass("uop-input-error");
	var button_label_loading = jQuery("#uop-submit").attr("data-loading");
	var button_label = jQuery("#uop-submit").attr("data-label");
	jQuery('#uop-submit').html(button_label_loading);
	
	var name = jQuery("#uop-name").val();
	if (name) name = uop_encode64(name);
	else name = '';
	var email = jQuery("#uop-email").val();
	if (email) email = uop_encode64(email);
	else email = '';
	
	jQuery.ajax({
		url: uop_ajax_url, 
		data: {
		"name" : name,
		"email" : email,
		"uop" : uop_panel_id,
		"action" : "subscribe"
		}, 
		dataType: "jsonp",
		success: function(data) {
			//alert(return_data);
			jQuery("#uop-submit").html(button_label);
			try {
				var status = data.status;
				if (status == "OK") {
					uop_write_cookie("uop-subscribed", uop_cookie_value, 180);
					var button_label_subscribed = jQuery("#uop-submit").attr("data-subscribed");
					jQuery('#uop-submit').html(button_label_subscribed);
					if (uop_success_close_enable == "on") {
						setTimeout(function() {
							uop_show_tab();
							jQuery("#uop-name").val("");
							jQuery("#uop-email").val("");
							jQuery("#uop-submit").html(button_label);
							uop_subscribing = false;
						}, uop_success_close_delay);
					} else {
						setTimeout(function() {
							jQuery("#uop-name").val("");
							jQuery("#uop-email").val("");
							jQuery("#uop-submit").html(button_label);
							uop_subscribing = false;
						}, 3000);
					}
				} else if (status == "ERROR") {
					uop_subscribing = false;
					if (data.name == 'ERROR') jQuery("#uop-name").addClass("uop-input-error");
					if (data.email == 'ERROR') jQuery("#uop-email").addClass("uop-input-error");
				} else {
					uop_subscribing = false;
					jQuery("#uop-submit").html("Error!");
				}
			} catch(error) {
				uop_subscribing = false;
				jQuery("#uop-submit").html("Error!");
			}
		}
	});
	return false;
}

function uop_encode64 (data) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	ac = 0,
	enc = "",
	tmp_arr = [];
	if (!data) return data;
	do {
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);
	enc = tmp_arr.join('');
	var r = data.length % 3;
	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
function uop_decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	var keyStr = "ABCDEFGHIJKLMNOP" +
		"QRSTUVWXYZabcdef" +
		"ghijklmnopqrstuv" +
		"wxyz0123456789+/" +
		"=";
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) return "";
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < input.length);
	return unescape(output);
}
function uop_read_cookie(key) {
	var pairs = document.cookie.split("; ");
	for (var i = 0, pair; pair = pairs[i] && pairs[i].split("="); i++) {
		if (pair[0] === key) return pair[1] || "";
	}
	return null;
}
function uop_write_cookie(key, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else var expires = "";
	document.cookie = key+"="+value+expires+"; path=/";
}

jQuery(document).ready(function() {
	uop_init();
});