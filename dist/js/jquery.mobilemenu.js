!function(n){function i(n){document.location.href=n}function t(){return n(".mnav").length?!0:!1}function e(i){var t=!0;return i.each(function(){n(this).is("ul")||n(this).is("ol")||(t=!1,console.log(t))}),t}function o(){return n(window).width()<s.switchWidth}function l(i){return n.trim(i.clone().children("ul, ol").remove().end().text())}function r(i){return-1===n.inArray(i,v)?!0:!1}function a(i){i.find(" > li").each(function(){var t=n(this),e=t.find("a").attr("href"),o=function(){return t.parent().parent().is("li")?t.parent().parent().find("a").attr("href"):null};t.find(" ul, ol").length&&a(t.find("> ul, > ol")),t.find(" > ul li, > ol li").length||t.find("ul, ol").remove(),!r(o(),v)&&r(e,v)?t.appendTo(i.closest("ul#mmnav").find("li:has(a[href="+o()+"]):first ul")):r(e)?v.push(e):t.remove()})}function u(){var i=n('<ul id="mmnav" />');return p.each(function(){n(this).children().clone().appendTo(i)}),a(i),console.log(i),i}function c(i,t,e){e?n('<option value="'+i.find("a:first").attr("href")+'">'+e+"</option>").appendTo(t):n('<option value="'+i.find("a:first").attr("href")+'">'+n.trim(l(i))+"</option>").appendTo(t)}function h(i,t){var e=n('<optgroup label="'+n.trim(l(i))+'" />');c(i,e,s.groupPageText),i.children("ul, ol").each(function(){n(this).children("li").each(function(){c(n(this),e)})}),e.appendTo(t)}function f(t){var e=n('<select id="mm'+m+'" class="mnav" />');m++,s.topOptionText&&c(n("<li>"+s.topOptionText+"</li>"),e),t.children("li").each(function(){var i=n(this);i.children("ul, ol").length&&s.nested?h(i,e):c(i,e)}),e.change(function(){i(n(this).val())}).prependTo(s.prependTo)}function d(){if(o()&&!t())if(s.combine){var i=u();f(i)}else p.each(function(){f(n(this))});o()&&t()&&(n(".mnav").show(),p.hide()),!o()&&t()&&(n(".mnav").hide(),p.show())}var p,s={combine:!0,groupPageText:"Main",nested:!0,prependTo:"nav",switchWidth:480,topOptionText:"Select a page"},m=0,v=[];n.fn.mobileMenu=function(i){i&&n.extend(s,i),e(n(this))?(p=n(this),d(),n(window).resize(function(){d()})):alert("mobileMenu only works with <ul>/<ol>")}}(jQuery);