ace.define("ace/mode/sql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/sql_highlight_rules","ace/range"],function(require,exports,module){var oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,SqlHighlightRules=require("./sql_highlight_rules").SqlHighlightRules,Range=require("../range").Range,Mode=function(){this.$tokenizer=new Tokenizer((new SqlHighlightRules).getRules())};oop.inherits(Mode,TextMode),function(){this.toggleCommentLines=function(state,doc,startRow,endRow){var outdent=!0,outentedRows=[],re=/^(\s*)--/;for(var i=startRow;i<=endRow;i++)if(!re.test(doc.getLine(i))){outdent=!1;break}if(outdent){var deleteRange=new Range(0,0,0,0);for(var i=startRow;i<=endRow;i++){var line=doc.getLine(i),m=line.match(re);deleteRange.start.row=i,deleteRange.end.row=i,deleteRange.end.column=m[0].length,doc.replace(deleteRange,m[1])}}else doc.indentRows(startRow,endRow,"--")}}.call(Mode.prototype),exports.Mode=Mode}),ace.define("ace/mode/sql_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),lang=require("../lib/lang"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,SqlHighlightRules=function(){var keywords=lang.arrayToMap("select|from|where|and|or|group|by|order|limit|offset|having|as|case|when|else|end|type|left|right|join|on|outer|desc|asc".split("|")),builtinConstants=lang.arrayToMap("true|false|null".split("|")),builtinFunctions=lang.arrayToMap("count|min|max|avg|sum|rank|now|coalesce".split("|"));this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*"'},{token:"string",regex:"'.*'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:function(value){return value=value.toLowerCase(),keywords.hasOwnProperty(value)?"keyword":builtinConstants.hasOwnProperty(value)?"constant.language":builtinFunctions.hasOwnProperty(value)?"support.function":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};oop.inherits(SqlHighlightRules,TextHighlightRules),exports.SqlHighlightRules=SqlHighlightRules})