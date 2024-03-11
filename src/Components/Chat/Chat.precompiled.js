(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Chat.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main>\n    <div class='chat_header'>\n        <h2 id='chat_header'>Выберите чат</h2>\n    </div>\n    <div className='chat'>\n        <div class='chat_width message_list' id='active-chat-container'></div>\n        <div id='chat_input' class='chat_width input_block'>\n            <button class='input_attach'>*скрепка*</button>\n            <input class='input_text' type='text' placeholder='Сообщение...' />\n            <button class='input_send'>-></button>\n        </div>\n    </div>\n</main>";
},"useData":true});
})();