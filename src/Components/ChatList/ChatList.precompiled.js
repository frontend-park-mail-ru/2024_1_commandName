(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ChatList.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<aside class='chat'>\n    <div class='chat_list_header'>\n        <h2> Чаты </h2>\n    </div>\n    <div className='seach_container'>\n        <input class='search_input' placeholder='Поиск...' />\n    </div>\n    <div class='chat_list' id='chat-list-container'> </div>\n    <div class='chat_list_menu'>\n        <div class='chat_list_menu_item'>Пользователь</div>\n    </div>\n    <button id='logout_btn'>Выйти</button>\n</aside>";
},"useData":true});
})();