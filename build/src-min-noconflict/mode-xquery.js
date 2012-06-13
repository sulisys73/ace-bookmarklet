ace.define("ace/mode/xquery",["require","exports","module","ace/worker/worker_client","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xquery_highlight_rules","ace/mode/behaviour/xquery","ace/range"],function(require,exports,module){var WorkerClient=require("../worker/worker_client").WorkerClient,oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,XQueryHighlightRules=require("./xquery_highlight_rules").XQueryHighlightRules,XQueryBehaviour=require("./behaviour/xquery").XQueryBehaviour,Range=require("../range").Range,Mode=function(parent){this.$tokenizer=new Tokenizer((new XQueryHighlightRules).getRules()),this.$behaviour=new XQueryBehaviour(parent)};oop.inherits(Mode,TextMode),function(){this.getNextLineIndent=function(state,line,tab){var indent=this.$getIndent(line),match=line.match(/\s*(?:then|else|return|[{\(]|<\w+>)\s*$/);return match&&(indent+=tab),indent},this.checkOutdent=function(state,line,input){return/^\s+$/.test(line)?/^\s*[\}\)]/.test(input):!1},this.autoOutdent=function(state,doc,row){var line=doc.getLine(row),match=line.match(/^(\s*[\}\)])/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){var match=line.match(/^(\s+)/);return match?match[1]:""},this.toggleCommentLines=function(state,doc,startRow,endRow){var i,line,outdent=!0,re=/^\s*\(:(.*):\)/;for(i=startRow;i<=endRow;i++)if(!re.test(doc.getLine(i))){outdent=!1;break}var range=new Range(0,0,0,0);for(i=startRow;i<=endRow;i++)line=doc.getLine(i),range.start.row=i,range.end.row=i,range.end.column=line.length,doc.replace(range,outdent?line.match(re)[1]:"(:"+line+":)")},this.createWorker=function(session){this.$deltas=[];var worker=new WorkerClient(["ace"],"worker-xquery.js","ace/mode/xquery_worker","XQueryWorker"),that=this;return session.getDocument().on("change",function(evt){that.$deltas.push(evt.data)}),worker.attachToDocument(session.getDocument()),worker.on("start",function(e){that.$deltas=[]}),worker.on("error",function(e){session.setAnnotations([e.data])}),worker.on("ok",function(e){session.clearAnnotations()}),worker.on("highlight",function(tokens){var firstRow=0,lastRow=session.getLength()-1,lines=tokens.data.lines,states=tokens.data.states;for(var i=0;i<that.$deltas.length;i++){var delta=that.$deltas[i];if(delta.action==="insertLines"){var newLineCount=delta.lines.length;for(var i=0;i<newLineCount;i++)lines.splice(delta.range.start.row+i,0,undefined),states.splice(delta.range.start.row+i,0,undefined)}else if(delta.action==="insertText")session.getDocument().isNewLine(delta.text)?(lines.splice(delta.range.end.row,0,undefined),states.splice(delta.range.end.row,0,undefined)):(lines[delta.range.start.row]=undefined,states[delta.range.start.row]=undefined);else if(delta.action==="removeLines"){var oldLineCount=delta.lines.length;lines.splice(delta.range.start.row,oldLineCount),states.splice(delta.range.start.row,oldLineCount)}else delta.action==="removeText"&&(session.getDocument().isNewLine(delta.text)?(lines[delta.range.start.row]=undefined,lines.splice(delta.range.end.row,1),states[delta.range.start.row]=undefined,states.splice(delta.range.end.row,1)):(lines[delta.range.start.row]=undefined,states[delta.range.start.row]=undefined))}session.bgTokenizer.lines=lines,session.bgTokenizer.states=states,session.bgTokenizer.fireUpdateEvent(firstRow,lastRow)}),worker}}.call(Mode.prototype),exports.Mode=Mode}),ace.define("ace/mode/xquery_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),lang=require("../lib/lang"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,XQueryHighlightRules=function(){var keywords=lang.arrayToMap("after|ancestor|ancestor-or-self|and|as|ascending|attribute|before|case|cast|castable|child|collation|comment|copy|count|declare|default|delete|descendant|descendant-or-self|descending|div|document|document-node|element|else|empty|empty-sequence|end|eq|every|except|first|following|following-sibling|for|function|ge|group|gt|idiv|if|import|insert|instance|intersect|into|is|item|last|le|let|lt|mod|modify|module|namespace|namespace-node|ne|node|only|or|order|ordered|parent|preceding|preceding-sibling|processing-instruction|rename|replace|return|satisfies|schema-attribute|schema-element|self|some|stable|start|switch|text|to|treat|try|typeswitch|union|unordered|validate|where|with|xquery|contains|paragraphs|sentences|times|words|by|collectionreturn|variable|version|option|when|encoding|toswitch|catch|tumbling|sliding|window|at|using|stemming|collection|schema|while|on|nodes|index|external|then|in|updating|value|of|containsbreak|loop|continue|exit|returning".split("|"));this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",regex:"<\\!--",next:"comment"},{token:"comment",regex:"\\(:",next:"comment"},{token:"text",regex:"<\\/?",next:"tag"},{token:"constant",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"variable",regex:"\\$[a-zA-Z_][a-zA-Z0-9_\\-:]*\\b"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"text",regex:"\\s+"},{token:"support.function",regex:"\\w[\\w+_\\-:]+(?=\\()"},{token:function(value){return keywords[value]?"keyword":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\*|=|<|>|\\-|\\+"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"}],tag:[{token:"text",regex:">",next:"start"},{token:"meta.tag",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"}],cdata:[{token:"comment",regex:"\\]\\]>",next:"start"},{token:"comment",regex:"\\s+"},{token:"comment",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",regex:".*:\\)",next:"start"},{token:"comment",regex:".+"}]}};oop.inherits(XQueryHighlightRules,TextHighlightRules),exports.XQueryHighlightRules=XQueryHighlightRules}),ace.define("ace/mode/behaviour/xquery",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(require,exports,module){var oop=require("../../lib/oop"),Behaviour=require("../behaviour").Behaviour,CstyleBehaviour=require("./cstyle").CstyleBehaviour,XQueryBehaviour=function(parent){this.inherit(CstyleBehaviour,["braces","parens","string_dquotes"]),this.parent=parent,this.add("brackets","insertion",function(state,action,editor,session,text){if(text=="\n"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChars=line.substring(cursor.column,cursor.column+2);if(rightChars=="</"){var indent=this.$getIndent(session.doc.getLine(cursor.row))+session.getTabString(),next_indent=this.$getIndent(session.doc.getLine(cursor.row));return{text:"\n"+indent+"\n"+next_indent,selection:[1,indent.length,1,indent.length]}}}return!1}),this.add("slash","insertion",function(state,action,editor,session,text){if(text=="/"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row);if(cursor.column>0&&line.charAt(cursor.column-1)=="<"){line=line.substring(0,cursor.column)+"/"+line.substring(cursor.column);var lines=session.doc.getAllLines();lines[cursor.row]=line,parent.exec("closeTag",lines.join(session.doc.getNewLineCharacter()),cursor.row)}}return!1})};oop.inherits(XQueryBehaviour,Behaviour),exports.XQueryBehaviour=XQueryBehaviour}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(require,exports,module){var oop=require("../../lib/oop"),Behaviour=require("../behaviour").Behaviour,CstyleBehaviour=function(){this.add("braces","insertion",function(state,action,editor,session,text){if(text=="{"){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"{"+selected+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(text=="}"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var matching=session.$findOpeningBracket("}",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}else if(text=="\n"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var openBracePos=session.findMatchingBracket({row:cursor.row,column:cursor.column+1});if(!openBracePos)return null;var indent=this.getNextLineIndent(state,line.substring(0,line.length-1),session.getTabString()),next_indent=this.$getIndent(session.doc.getLine(openBracePos.row));return{text:"\n"+indent+"\n"+next_indent,selection:[1,indent.length,1,indent.length]}}}}),this.add("braces","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="{"){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.end.column,range.end.column+1);if(rightChar=="}")return range.end.column++,range}}),this.add("parens","insertion",function(state,action,editor,session,text){if(text=="("){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"("+selected+")",selection:!1}:{text:"()",selection:[1,1]}}if(text==")"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==")"){var matching=session.$findOpeningBracket(")",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="("){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar==")")return range.end.column++,range}}),this.add("string_dquotes","insertion",function(state,action,editor,session,text){if(text=='"'||text=="'"){var quote=text,selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);if(selected!=="")return{text:quote+selected+quote,selection:!1};var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),leftChar=line.substring(cursor.column-1,cursor.column);if(leftChar=="\\")return null;var tokens=session.getTokens(selection.start.row),col=0,token,quotepos=-1;for(var x=0;x<tokens.length;x++){token=tokens[x],token.type=="string"?quotepos=-1:quotepos<0&&(quotepos=token.value.indexOf(quote));if(token.value.length+col>selection.start.column)break;col+=tokens[x].value.length}if(!token||quotepos<0&&token.type!=="comment"&&(token.type!=="string"||selection.start.column!==token.value.length+col-1&&token.value.lastIndexOf(quote)===token.value.length-1))return{text:quote+quote,selection:[1,1]};if(token&&token.type==="string"){var rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==quote)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&(selected=='"'||selected=="'")){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar=='"')return range.end.column++,range}})};oop.inherits(CstyleBehaviour,Behaviour),exports.CstyleBehaviour=CstyleBehaviour})