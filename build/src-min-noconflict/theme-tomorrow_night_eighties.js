ace.define("ace/theme/tomorrow_night_eighties",["require","exports","module","ace/lib/dom"],function(require,exports,module){exports.isDark=!0,exports.cssClass="ace-tomorrow-night-eighties",exports.cssText="\n.ace-tomorrow-night-eighties .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tomorrow-night-eighties .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tomorrow-night-eighties .ace_gutter {\n  background: #e8e8e8;\n  color: #333;\n}\n\n.ace-tomorrow-night-eighties .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tomorrow-night-eighties .ace_scroller {\n  background-color: #2D2D2D;\n}\n\n.ace-tomorrow-night-eighties .ace_text-layer {\n  cursor: text;\n  color: #CCCCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_cursor {\n  border-left: 2px solid #CCCCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #CCCCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_marker-layer .ace_selection {\n  background: #515151;\n}\n\n.ace-tomorrow-night-eighties.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px #2D2D2D;\n  border-radius: 2px;\n}\n\n.ace-tomorrow-night-eighties .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0);\n}\n\n.ace-tomorrow-night-eighties .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #6A6A6A;\n}\n\n.ace-tomorrow-night-eighties .ace_marker-layer .ace_active_line {\n  background: #393939;\n}\n\n.ace-tomorrow-night-eighties .ace_gutter_active_line {\n  background-color : #dcdcdc;\n}\n\n.ace-tomorrow-night-eighties .ace_marker-layer .ace_selected_word {\n  border: 1px solid #515151;\n}\n\n.ace-tomorrow-night-eighties .ace_invisible {\n  color: #6A6A6A;\n}\n\n.ace-tomorrow-night-eighties .ace_keyword, .ace-tomorrow-night-eighties .ace_meta {\n  color:#CC99CC;\n}\n\n.ace-tomorrow-night-eighties .ace_keyword.ace_operator {\n  color:#66CCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_constant.ace_language {\n  color:#F99157;\n}\n\n.ace-tomorrow-night-eighties .ace_constant.ace_numeric {\n  color:#F99157;\n}\n\n.ace-tomorrow-night-eighties .ace_constant.ace_other {\n  color:#CCCCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_invalid {\n  color:#CDCDCD;\nbackground-color:#F2777A;\n}\n\n.ace-tomorrow-night-eighties .ace_invalid.ace_deprecated {\n  color:#CDCDCD;\nbackground-color:#CC99CC;\n}\n\n.ace-tomorrow-night-eighties .ace_support.ace_constant {\n  color:#F99157;\n}\n\n.ace-tomorrow-night-eighties .ace_fold {\n    background-color: #6699CC;\n    border-color: #CCCCCC;\n}\n\n.ace-tomorrow-night-eighties .ace_support.ace_function {\n  color:#6699CC;\n}\n\n.ace-tomorrow-night-eighties .ace_storage {\n  color:#CC99CC;\n}\n\n.ace-tomorrow-night-eighties .ace_storage.ace_type,  .ace-tomorrow-night-eighties .ace_support.ace_type{\n  color:#CC99CC;\n}\n\n.ace-tomorrow-night-eighties .ace_variable {\n  color:#6699CC;\n}\n\n.ace-tomorrow-night-eighties .ace_variable.ace_parameter {\n  color:#F99157;\n}\n\n.ace-tomorrow-night-eighties .ace_string {\n  color:#99CC99;\n}\n\n.ace-tomorrow-night-eighties .ace_comment {\n  color:#999999;\n}\n\n.ace-tomorrow-night-eighties .ace_variable {\n  color:#F2777A;\n}\n\n.ace-tomorrow-night-eighties .ace_meta.ace_tag {\n  color:#F2777A;\n}\n\n.ace-tomorrow-night-eighties .ace_entity.ace_other.ace_attribute-name {\n  color:#F2777A;\n}\n\n.ace-tomorrow-night-eighties .ace_entity.ace_name.ace_function {\n  color:#6699CC;\n}\n\n.ace-tomorrow-night-eighties .ace_markup.ace_underline {\n    text-decoration:underline;\n}\n\n.ace-tomorrow-night-eighties .ace_markup.ace_heading {\n  color:#99CC99;\n}";var dom=require("../lib/dom");dom.importCssString(exports.cssText,exports.cssClass)})