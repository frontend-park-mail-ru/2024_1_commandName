(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Form.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <input class=\"form-input\" type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"required") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":111},"end":{"line":5,"column":142}}})) != null ? stack1 : "")
    + " />\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "required";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"form-container\">\n    <form id='form' class=\"form\">\n        <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"header") || (depth0 != null ? lookupProperty(depth0,"header") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":22}}}) : helper)))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":6,"column":17}}})) != null ? stack1 : "")
    + "\n        <button class=\"form-button\" type='submit' id=\"submitButton\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"submitButtonText") || (depth0 != null ? lookupProperty(depth0,"submitButtonText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"submitButtonText","hash":{},"data":data,"loc":{"start":{"line":8,"column":68},"end":{"line":8,"column":88}}}) : helper)))
    + "</button>\n        <button class=\"form-button\" id=\"additionButton\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"additionButtonText") || (depth0 != null ? lookupProperty(depth0,"additionButtonText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"additionButtonText","hash":{},"data":data,"loc":{"start":{"line":9,"column":56},"end":{"line":9,"column":78}}}) : helper)))
    + "</button>\n        <p class=\"form-error-message\" id=\"error-message\"></p>\n    </form>\n</div>";
},"useData":true});
})();