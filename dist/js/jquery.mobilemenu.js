!function(l){var e,r={combine:!0,groupPageText:"Main",nested:!0,prependTo:"nav",switchWidth:480,topOptionText:"Select a page"},i=0,a=[];function n(){return!!l(".mnav").length}function t(){return l(window).width()<r.switchWidth}function u(n){return l.trim(n.clone().children("ul, ol").remove().end().text())}function c(n){return-1===l.inArray(n,a)}function o(){var n=l('<ul id="mmnav" />');return e.each(function(){l(this).children().clone().appendTo(n)}),function e(o){o.find(" > li").each(function(){function n(){return i.parent().parent().is("li")?i.parent().parent().find("a").attr("href"):null}var i=l(this),t=i.find("a").attr("href");i.find(" ul, ol").length&&e(i.find("> ul, > ol")),i.find(" > ul li, > ol li").length||i.find("ul, ol").remove(),!c(n())&&c(t)?i.appendTo(o.closest("ul#mmnav").find("li:has(a[href="+n()+"]):first ul")):c(t)?a.push(t):i.remove()})}(n),console.log(n),n}function h(n,i,t){t?l('<option value="'+n.find("a:first").attr("href")+'">'+t+"</option>").appendTo(i):l('<option value="'+n.find("a:first").attr("href")+'">'+l.trim(u(n))+"</option>").appendTo(i)}function f(n){var o=l('<select id="mm'+i+'" class="mnav" />');i++,r.topOptionText&&h(l("<li>"+r.topOptionText+"</li>"),o),n.children("li").each(function(){var n,i,t,e=l(this);e.children("ul, ol").length&&r.nested?(n=e,i=o,t=l('<optgroup label="'+l.trim(u(n))+'" />'),h(n,t,r.groupPageText),n.children("ul, ol").each(function(){l(this).children("li").each(function(){h(l(this),t)})}),t.appendTo(i)):h(e,o)}),o.change(function(){var n;n=l(this).val(),document.location.href=n}).prependTo(r.prependTo)}function d(){t()&&!n()&&(r.combine?f(o()):e.each(function(){f(l(this))}));t()&&n()&&(l(".mnav").show(),e.hide()),!t()&&n()&&(l(".mnav").hide(),e.show())}l.fn.mobileMenu=function(n){var i,t;n&&l.extend(r,n),i=l(this),t=!0,i.each(function(){l(this).is("ul")||l(this).is("ol")||(t=!1,console.log(t))}),t?(e=l(this),d(),l(window).resize(function(){d()})):alert("mobileMenu only works with <ul>/<ol>")}}(jQuery);