define("ace/mode/groovy",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/tokenizer","ace/mode/groovy_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),JavaScriptMode=require("./javascript").Mode,Tokenizer=require("../tokenizer").Tokenizer,GroovyHighlightRules=require("./groovy_highlight_rules").GroovyHighlightRules,Mode=function(){JavaScriptMode.call(this),this.$tokenizer=new Tokenizer((new GroovyHighlightRules).getRules())};oop.inherits(Mode,JavaScriptMode),function(){this.createWorker=function(session){return null}}.call(Mode.prototype),exports.Mode=Mode}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(require,exports,module){var oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,JavaScriptHighlightRules=require("./javascript_highlight_rules").JavaScriptHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Range=require("../range").Range,WorkerClient=require("../worker/worker_client").WorkerClient,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.$tokenizer=new Tokenizer((new JavaScriptHighlightRules).getRules()),this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.toggleCommentLines=function(state,doc,startRow,endRow){var outdent=!0,re=/^(\s*)\/\//;for(var i=startRow;i<=endRow;i++)if(!re.test(doc.getLine(i))){outdent=!1;break}if(outdent){var deleteRange=new Range(0,0,0,0);for(var i=startRow;i<=endRow;i++){var line=doc.getLine(i),m=line.match(re);deleteRange.start.row=i,deleteRange.end.row=i,deleteRange.end.column=m[0].length,doc.replace(deleteRange,m[1])}}else doc.indentRows(startRow,endRow,"//")},this.getNextLineIndent=function(state,line,tab){var indent=this.$getIndent(line),tokenizedLine=this.$tokenizer.getLineTokens(line,state),tokens=tokenizedLine.tokens,endState=tokenizedLine.state;if(tokens.length&&tokens[tokens.length-1].type=="comment")return indent;if(state=="start"||state=="regex_allowed"){var match=line.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);match&&(indent+=tab)}else if(state=="doc-start"){if(endState=="start"||state=="regex_allowed")return"";var match=line.match(/^\s*(\/?)\*/);match&&(match[1]&&(indent+=" "),indent+="* ")}return indent},this.checkOutdent=function(state,line,input){return this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(state,doc,row){this.$outdent.autoOutdent(doc,row)},this.createWorker=function(session){var worker=new WorkerClient(["ace"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return worker.attachToDocument(session.getDocument()),worker.on("jslint",function(results){var errors=[];for(var i=0;i<results.data.length;i++){var error=results.data[i];error&&errors.push({row:error.line-1,column:error.character-1,text:error.reason,type:"warning",lint:error})}session.setAnnotations(errors)}),worker.on("narcissus",function(e){session.setAnnotations([e.data])}),worker.on("terminate",function(){session.clearAnnotations()}),worker}}.call(Mode.prototype),exports.Mode=Mode}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),lang=require("../lib/lang"),unicode=require("../unicode"),DocCommentHighlightRules=require("./doc_comment_highlight_rules").DocCommentHighlightRules,TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,JavaScriptHighlightRules=function(){var globals=lang.arrayToMap("Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document".split("|")),keywords=lang.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),kwBeforeRe="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield",deprecated=lang.arrayToMap("__parent__|__count__|escape|unescape|with|__proto__".split("|")),definitions=lang.arrayToMap("const|let|var|function".split("|")),buildinConstants=lang.arrayToMap("null|Infinity|NaN|undefined".split("|")),futureReserved=lang.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),identifierRe="["+unicode.packages.L+"\\$_]["+unicode.packages.L+unicode.packages.Mn+unicode.packages.Mc+unicode.packages.Nd+unicode.packages.Pc+"\\$_]*\\b",escapedRe="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={start:[{token:"comment",regex:/\/\/.*$/},DocCommentHighlightRules.getStartRule("doc-start"),{token:"comment",merge:!0,regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+identifierRe+")(\\.)(prototype)(\\.)("+identifierRe+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text"],regex:"("+identifierRe+")(\\.)(prototype)(\\.)("+identifierRe+")(\\s*)(=)(\\s*)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+identifierRe+")(\\.)("+identifierRe+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+identifierRe+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+identifierRe+")(\\.)("+identifierRe+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+identifierRe+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+identifierRe+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"constant.language.boolean",regex:/(?:true|false)\b/},{token:"keyword",regex:"(?:"+kwBeforeRe+")\\b",next:"regex_allowed"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:function(value){return globals.hasOwnProperty(value)?"variable.language":deprecated.hasOwnProperty(value)?"invalid.deprecated":definitions.hasOwnProperty(value)?"storage.type":keywords.hasOwnProperty(value)?"keyword":buildinConstants.hasOwnProperty(value)?"constant.language":futureReserved.hasOwnProperty(value)?"invalid.illegal":value=="debugger"?"invalid.deprecated":"identifier"},regex:identifierRe},{token:"keyword.operator",regex:/!|\$|%|&|\*|\-\-|\-|\+\+|\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=|\b(?:in|instanceof|new|delete|typeof|void)/,next:"regex_allowed"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"regex_allowed"},{token:"paren.lparen",regex:/[\[({]/,next:"regex_allowed"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"regex_allowed"},{token:"comment",regex:/^#!.*$/},{token:"text",regex:/\s+/}],regex_allowed:[DocCommentHighlightRules.getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/",next:"regex",merge:!0},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/\\w*",next:"start",merge:!0},{token:"string.regexp",regex:"[^\\\\/\\[]+",merge:!0},{token:"string.regexp.charachterclass",regex:"\\[",next:"regex_character_class",merge:!0},{token:"empty",regex:"",next:"start"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp.charachterclass",regex:"]",next:"regex",merge:!0},{token:"string.regexp.charachterclass",regex:"[^\\\\\\]]+",merge:!0},{token:"empty",regex:"",next:"start"}],function_arguments:[{token:"variable.parameter",regex:identifierRe},{token:"punctuation.operator",regex:"[, ]+",merge:!0},{token:"punctuation.operator",regex:"$",merge:!0},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"regex_allowed"},{token:"comment",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"constant.language.escape",regex:escapedRe},{token:"string",regex:'[^"\\\\]+',merge:!0},{token:"string",regex:"\\\\$",next:"qqstring",merge:!0},{token:"string",regex:'"|$',next:"start",merge:!0}],qstring:[{token:"constant.language.escape",regex:escapedRe},{token:"string",regex:"[^'\\\\]+",merge:!0},{token:"string",regex:"\\\\$",next:"qstring",merge:!0},{token:"string",regex:"'|$",next:"start",merge:!0}]},this.embedRules(DocCommentHighlightRules,"doc-",[DocCommentHighlightRules.getEndRule("start")])};oop.inherits(JavaScriptHighlightRules,TextHighlightRules),exports.JavaScriptHighlightRules=JavaScriptHighlightRules}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,DocCommentHighlightRules=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};oop.inherits(DocCommentHighlightRules,TextHighlightRules),DocCommentHighlightRules.getStartRule=function(start){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:start}},DocCommentHighlightRules.getEndRule=function(start){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:start}},exports.DocCommentHighlightRules=DocCommentHighlightRules}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return/^\s+$/.test(line)?/^\s*\}/.test(input):!1},this.autoOutdent=function(doc,row){var line=doc.getLine(row),match=line.match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){var match=line.match(/^(\s+)/);return match?match[1]:""}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(require,exports,module){var oop=require("../../lib/oop"),Behaviour=require("../behaviour").Behaviour,CstyleBehaviour=function(){this.add("braces","insertion",function(state,action,editor,session,text){if(text=="{"){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"{"+selected+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(text=="}"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var matching=session.$findOpeningBracket("}",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}else if(text=="\n"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var openBracePos=session.findMatchingBracket({row:cursor.row,column:cursor.column+1});if(!openBracePos)return null;var indent=this.getNextLineIndent(state,line.substring(0,line.length-1),session.getTabString()),next_indent=this.$getIndent(session.doc.getLine(openBracePos.row));return{text:"\n"+indent+"\n"+next_indent,selection:[1,indent.length,1,indent.length]}}}}),this.add("braces","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="{"){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.end.column,range.end.column+1);if(rightChar=="}")return range.end.column++,range}}),this.add("parens","insertion",function(state,action,editor,session,text){if(text=="("){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"("+selected+")",selection:!1}:{text:"()",selection:[1,1]}}if(text==")"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==")"){var matching=session.$findOpeningBracket(")",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="("){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar==")")return range.end.column++,range}}),this.add("string_dquotes","insertion",function(state,action,editor,session,text){if(text=='"'||text=="'"){var quote=text,selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);if(selected!=="")return{text:quote+selected+quote,selection:!1};var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),leftChar=line.substring(cursor.column-1,cursor.column);if(leftChar=="\\")return null;var tokens=session.getTokens(selection.start.row),col=0,token,quotepos=-1;for(var x=0;x<tokens.length;x++){token=tokens[x],token.type=="string"?quotepos=-1:quotepos<0&&(quotepos=token.value.indexOf(quote));if(token.value.length+col>selection.start.column)break;col+=tokens[x].value.length}if(!token||quotepos<0&&token.type!=="comment"&&(token.type!=="string"||selection.start.column!==token.value.length+col-1&&token.value.lastIndexOf(quote)===token.value.length-1))return{text:quote+quote,selection:[1,1]};if(token&&token.type==="string"){var rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==quote)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&(selected=='"'||selected=="'")){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar=='"')return range.end.column++,range}})};oop.inherits(CstyleBehaviour,Behaviour),exports.CstyleBehaviour=CstyleBehaviour}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(require,exports,module){var oop=require("../../lib/oop"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(session,foldStyle,row){var line=session.getLine(row),match=line.match(this.foldingStartMarker);if(match){var i=match.index;if(match[1])return this.openingBracketBlock(session,match[1],row,i);var range=session.getCommentFoldRange(row,i+match[0].length);return range.end.column-=2,range}if(foldStyle!=="markbeginend")return;var match=line.match(this.foldingStopMarker);if(match){var i=match.index+match[0].length;if(match[2]){var range=session.getCommentFoldRange(row,i);return range.end.column-=2,range}var end={row:row,column:i},start=session.$findOpeningBracket(match[1],end);if(!start)return;return start.column++,end.column--,Range.fromPoints(start,end)}}}.call(FoldMode.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);return this.foldingStartMarker.test(line)?"start":foldStyle=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(line)?"end":""},this.getFoldWidgetRange=function(session,foldStyle,row){return null},this.indentationBlock=function(session,row,column){var re=/^\s*/,startRow=row,endRow=row,line=session.getLine(row),startColumn=column||line.length,startLevel=line.match(re)[0].length,maxRow=session.getLength();while(++row<maxRow){line=session.getLine(row);var level=line.match(re)[0].length;if(level==line.length)continue;if(level<=startLevel)break;endRow=row}if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}},this.openingBracketBlock=function(session,bracket,row,column,typeRe,allowBlankLine){var start={row:row,column:column+1},end=session.$findClosingBracket(bracket,start,typeRe,allowBlankLine);if(!end)return;var fw=session.foldWidgets[end.row];return fw==null&&(fw=this.getFoldWidget(session,end.row)),fw=="start"&&(end.row--,end.column=session.getLine(end.row).length),Range.fromPoints(start,end)}}).call(FoldMode.prototype)}),define("ace/mode/groovy_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),lang=require("../lib/lang"),DocCommentHighlightRules=require("./doc_comment_highlight_rules").DocCommentHighlightRules,TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,GroovyHighlightRules=function(){var keywords=lang.arrayToMap("assert|with|abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|def|float|native|super|while".split("|")),buildinConstants=lang.arrayToMap("null|Infinity|NaN|undefined".split("|")),langClasses=lang.arrayToMap("AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object".split("|")),importClasses=lang.arrayToMap("".split("|"));this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},DocCommentHighlightRules.getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'"""',next:"qqstring"},{token:"string",regex:"'''",next:"qstring"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(value){return value=="this"?"variable.language":keywords.hasOwnProperty(value)?"keyword":langClasses.hasOwnProperty(value)?"support.function":importClasses.hasOwnProperty(value)?"support.function":buildinConstants.hasOwnProperty(value)?"constant.language":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\?:|\\?\\.|\\*\\.|<=>|=~|==~|\\.@|\\*\\.@|\\.&|as|in|is|!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"constant.language.escape",regex:/\\(?:u[0-9A-Fa-f]{4}|.|$)/},{token:"constant.language.escape",regex:/\$[\w\d]+/},{token:"constant.language.escape",regex:/\$\{[^"\}]+\}?/},{token:"string",regex:'"{3,5}',next:"start"},{token:"string",regex:".+?"}],qstring:[{token:"constant.language.escape",regex:/\\(?:u[0-9A-Fa-f]{4}|.|$)/},{token:"string",regex:"'{3,5}",next:"start"},{token:"string",regex:".+?"}]},this.embedRules(DocCommentHighlightRules,"doc-",[DocCommentHighlightRules.getEndRule("start")])};oop.inherits(GroovyHighlightRules,TextHighlightRules),exports.GroovyHighlightRules=GroovyHighlightRules})