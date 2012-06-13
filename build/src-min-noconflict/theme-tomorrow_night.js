ace.define("ace/theme/tomorrow_night",["require","exports","module","ace/lib/dom"],function(require,exports,module){exports.isDark=!0,exports.cssClass="ace-tomorrow-night",exports.cssText="\n.ace-tomorrow-night .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tomorrow-night .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tomorrow-night .ace_gutter {\n  background: #e8e8e8;\n  color: #333;\n}\n\n.ace-tomorrow-night .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tomorrow-night .ace_scroller {\n  background-color: #1D1F21;\n}\n\n.ace-tomorrow-night .ace_text-layer {\n  cursor: text;\n  color: #C5C8C6;\n}\n\n.ace-tomorrow-night .ace_cursor {\n  border-left: 2px solid #AEAFAD;\n}\n\n.ace-tomorrow-night .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #AEAFAD;\n}\n\n.ace-tomorrow-night .ace_marker-layer .ace_selection {\n  background: #373B41;\n}\n\n.ace-tomorrow-night.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px #1D1F21;\n  border-radius: 2px;\n}\n\n.ace-tomorrow-night .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0);\n}\n\n.ace-tomorrow-night .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #4B4E55;\n}\n\n.ace-tomorrow-night .ace_marker-layer .ace_active_line {\n  background: #282A2E;\n}\n\n.ace-tomorrow-night .ace_gutter_active_line {\n  background-color : #dcdcdc;\n}\n\n.ace-tomorrow-night .ace_marker-layer .ace_selected_word {\n  border: 1px solid #373B41;\n}\n\n.ace-tomorrow-night .ace_invisible {\n  color: #4B4E55;\n}\n\n.ace-tomorrow-night .ace_keyword, .ace-tomorrow-night .ace_meta {\n  color:#B294BB;\n}\n\n.ace-tomorrow-night .ace_keyword.ace_operator {\n  color:#8ABEB7;\n}\n\n.ace-tomorrow-night .ace_constant.ace_language {\n  color:#DE935F;\n}\n\n.ace-tomorrow-night .ace_constant.ace_numeric {\n  color:#DE935F;\n}\n\n.ace-tomorrow-night .ace_constant.ace_other {\n  color:#CED1CF;\n}\n\n.ace-tomorrow-night .ace_invalid {\n  color:#CED2CF;\nbackground-color:#DF5F5F;\n}\n\n.ace-tomorrow-night .ace_invalid.ace_deprecated {\n  color:#CED2CF;\nbackground-color:#B798BF;\n}\n\n.ace-tomorrow-night .ace_support.ace_constant {\n  color:#DE935F;\n}\n\n.ace-tomorrow-night .ace_fold {\n    background-color: #81A2BE;\n    border-color: #C5C8C6;\n}\n\n.ace-tomorrow-night .ace_support.ace_function {\n  color:#81A2BE;\n}\n\n.ace-tomorrow-night .ace_storage {\n  color:#B294BB;\n}\n\n.ace-tomorrow-night .ace_storage.ace_type,  .ace-tomorrow-night .ace_support.ace_type{\n  color:#B294BB;\n}\n\n.ace-tomorrow-night .ace_variable {\n  color:#81A2BE;\n}\n\n.ace-tomorrow-night .ace_variable.ace_parameter {\n  color:#DE935F;\n}\n\n.ace-tomorrow-night .ace_string {\n  color:#B5BD68;\n}\n\n.ace-tomorrow-night .ace_string.ace_regexp {\n  color:#CC6666;\n}\n\n.ace-tomorrow-night .ace_comment {\n  color:#969896;\n}\n\n.ace-tomorrow-night .ace_variable {\n  color:#CC6666;\n}\n\n.ace-tomorrow-night .ace_meta.ace_tag {\n  color:#CC6666;\n}\n\n.ace-tomorrow-night .ace_entity.ace_other.ace_attribute-name {\n  color:#CC6666;\n}\n\n.ace-tomorrow-night .ace_entity.ace_name.ace_function {\n  color:#81A2BE;\n}\n\n.ace-tomorrow-night .ace_markup.ace_underline {\n    text-decoration:underline;\n}\n\n.ace-tomorrow-night .ace_markup.ace_heading {\n  color:#B5BD68;\n}";var dom=require("../lib/dom");dom.importCssString(exports.cssText,exports.cssClass)})