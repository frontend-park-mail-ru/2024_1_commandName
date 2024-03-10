(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ChatList.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"username") : depth0), depth0))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<aside>\n    <div class='chat_list_header'>\n        <h2> Чаты </h2>\n    </div>\n    <div class='chat_list' id='chat-list-container'>\n        <div className='seach_container'>\n            <input class='search_input' placeholder='Поиск...' />\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chats") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n    <div class='chat_menu'>\n        <div class='chat_menu_item'>Пользователь</div>\n    </div>\n    <button id='logout_btn'>Выйти</button>\n</aside>";
},"useData":true});
})();