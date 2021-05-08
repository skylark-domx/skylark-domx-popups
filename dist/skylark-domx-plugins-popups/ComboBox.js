/**
 * skylark-domx-plugins-popups - The skylark popup utility library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","./popups","./Dropdown"],function(e,t,i,s,n,l,o,h,r){var d=o.Plugin.inherit({klassName:"ComboBox",pluginName:"domx.combobox",options:{autoResizeMenu:!0,filterOnKeypress:!1,showOptionsOnKeypress:!1,filter:function(e,t,i){var s=0;i.$dropMenu.find(".empty-indicator").remove(),e.each(function(e){var i=l(this),n=l(this).text().trim();i.removeClass(),n===t?(i.addClass("text-success"),s++):n.substr(0,t.length)===t?(i.addClass("text-info"),s++):i.addClass("hidden")}),0===s&&i.$dropMenu.append('<li class="empty-indicator text-muted"><em>No Matches</em></li>')}},_construct:function(t,i){this.overrided(t,i),this.$element=this.$(),this.$dropMenu=this.$element.find(".dropdown-menu"),this.$input=this.$element.find("input"),this.$button=this.$element.find(".btn"),this.$button.plugin("domx.dropdown"),this.$inputGroupBtn=this.$element.find(".input-group-btn"),this.$element.on("click.lark","a",e.proxy(this.itemclicked,this)),this.$element.on("change.lark","input",e.proxy(this.inputchanged,this)),this.$element.on("shown.bs.dropdown",e.proxy(this.menuShown,this)),this.$input.on("keyup.lark",e.proxy(this.keypress,this)),this.setDefaultSelection(),0===this.$dropMenu.children("li").length&&this.$button.addClass("disabled"),this.options.filterOnKeypress&&this.options.filter(this.$dropMenu.find("li"),this.$input.val(),this)},_destroy:function(){return this.$element.remove(),this.$element.find("input").each(function(){l(this).attr("value",l(this).val())}),this.$element[0].outerHTML},doSelect:function(e){void 0!==e[0]?(this.$element.find("li.selected:first").removeClass("selected"),this.$selectedItem=e,this.$selectedItem.addClass("selected"),this.$input.val(this.$selectedItem.text().trim())):(this.$selectedItem=null,this.$element.find("li.selected:first").removeClass("selected"))},clearSelection:function(){this.$selectedItem=null,this.$input.val(""),this.$dropMenu.find("li").removeClass("selected")},menuShown:function(){this.options.autoResizeMenu&&this.resizeMenu()},resizeMenu:function(){var e=this.$element.outerWidth();this.$dropMenu.outerWidth(e)},selectedItem:function(){var t={};if(this.$selectedItem){var i=this.$selectedItem.text().trim();t=e.mixin({text:i},this.$selectedItem.data())}else t={text:this.$input.val().trim(),notFound:!0};return t},selectByText:function(e){var t=l([]);this.$element.find("li").each(function(){if((this.textContent||this.innerText||l(this).text()||"").trim().toLowerCase()===(e||"").trim().toLowerCase())return t=l(this),!1}),this.doSelect(t)},selectByValue:function(e){var t='li[data-value="'+e+'"]';this.selectBySelector(t)},selectByIndex:function(e){var t="li:eq("+e+")";this.selectBySelector(t)},selectBySelector:function(e){var t=this.$element.find(e);this.doSelect(t)},setDefaultSelection:function(){var e="li[data-selected=true]:first",t=this.$element.find(e);t.length>0&&(this.selectBySelector(e),t.removeData("selected"),t.removeAttr("data-selected"))},enable:function(){this.$element.removeClass("disabled"),this.$input.removeAttr("disabled"),this.$button.removeClass("disabled")},disable:function(){this.$element.addClass("disabled"),this.$input.attr("disabled",!0),this.$button.addClass("disabled")},itemclicked:function(e){this.$selectedItem=l(e.target).parent(),this.$input.val(this.$selectedItem.text().trim()).trigger("change",{synthetic:!0});var t=this.selectedItem();this.$element.trigger("changed.lark",t),e.preventDefault(),this.$element.find(".dropdown-toggle").focus()},keypress:function(e){var t=38===e.which||40===e.which||37===e.which||39===e.which;if(this.options.showOptionsOnKeypress&&!this.$inputGroupBtn.hasClass("open")&&(this.$button.plugin("domx.dropdown").toggle(),this.$input.focus()),13===e.which){e.preventDefault();var i=this.$dropMenu.find("li.selected").text().trim();i.length>0?this.selectByText(i):this.selectByText(this.$input.val()),this.$inputGroupBtn.removeClass("open")}else if(27===e.which)e.preventDefault(),this.clearSelection(),this.$inputGroupBtn.removeClass("open");else if(this.options.showOptionsOnKeypress&&(40===e.which||38===e.which)){e.preventDefault();var s=this.$dropMenu.find("li.selected");s.length>0&&(s=40===e.which?s.next(":not(.hidden)"):s.prev(":not(.hidden)")),0===s.length&&(s=40===e.which?this.$dropMenu.find("li:not(.hidden):first"):this.$dropMenu.find("li:not(.hidden):last")),this.doSelect(s)}this.options.filterOnKeypress&&!t&&this.options.filter(this.$dropMenu.find("li"),this.$input.val(),this),this.previousKeyPress=e.which},inputchanged:function(e,t){var i=l(e.target).val();if(t&&t.synthetic)this.selectByText(i);else{this.selectByText(i);var s=this.selectedItem();0===s.text.length&&(s={text:i}),this.$element.trigger("changed.lark",s)}}});return d.prototype.getValue=d.prototype.selectedItem,o.register(d),h.ComboBox=d});
//# sourceMappingURL=sourcemaps/ComboBox.js.map
