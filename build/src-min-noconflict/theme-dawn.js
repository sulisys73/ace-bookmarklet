ace.define("ace/theme/dawn",["require","exports","module","ace/lib/dom"],function(require,exports,module){exports.isDark=!1,exports.cssClass="ace-dawn",exports.cssText="\n.ace-dawn .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-dawn .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-dawn .ace_gutter {\n  background: #e8e8e8;\n  color: #333;\n}\n\n.ace-dawn .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-dawn .ace_scroller {\n  background-color: #F9F9F9;\n}\n\n.ace-dawn .ace_text-layer {\n  cursor: text;\n  color: #080808;\n}\n\n.ace-dawn .ace_cursor {\n  border-left: 2px solid #000000;\n}\n\n.ace-dawn .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #000000;\n}\n\n.ace-dawn .ace_marker-layer .ace_selection {\n  background: rgba(39, 95, 255, 0.30);\n}\n\n.ace-dawn.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px #F9F9F9;\n  border-radius: 2px;\n}\n\n.ace-dawn .ace_marker-layer .ace_step {\n  background: rgb(255, 255, 0);\n}\n\n.ace-dawn .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgba(75, 75, 126, 0.50);\n}\n\n.ace-dawn .ace_marker-layer .ace_active_line {\n  background: rgba(36, 99, 180, 0.12);\n}\n\n.ace-dawn .ace_gutter_active_line {\n  background-color : #dcdcdc;\n}\n\n.ace-dawn .ace_marker-layer .ace_selected_word {\n  border: 1px solid rgba(39, 95, 255, 0.30);\n}\n\n.ace-dawn .ace_invisible {\n  color: rgba(75, 75, 126, 0.50);\n}\n\n.ace-dawn .ace_keyword, .ace-dawn .ace_meta {\n  color:#794938;\n}\n\n.ace-dawn .ace_constant, .ace-dawn .ace_constant.ace_other {\n  color:#811F24;\n}\n\n.ace-dawn .ace_constant.ace_character,  {\n  color:#811F24;\n}\n\n.ace-dawn .ace_constant.ace_character.ace_escape,  {\n  color:#811F24;\n}\n\n.ace-dawn .ace_invalid.ace_illegal {\n  text-decoration:underline;\nfont-style:italic;\ncolor:#F8F8F8;\nbackground-color:#B52A1D;\n}\n\n.ace-dawn .ace_invalid.ace_deprecated {\n  text-decoration:underline;\nfont-style:italic;\ncolor:#B52A1D;\n}\n\n.ace-dawn .ace_support {\n  color:#691C97;\n}\n\n.ace-dawn .ace_support.ace_constant {\n  color:#B4371F;\n}\n\n.ace-dawn .ace_fold {\n    background-color: #794938;\n    border-color: #080808;\n}\n\n.ace-dawn .ace_support.ace_function {\n  color:#693A17;\n}\n\n.ace-dawn .ace_storage {\n  font-style:italic;\ncolor:#A71D5D;\n}\n\n.ace-dawn .ace_string {\n  color:#0B6125;\n}\n\n.ace-dawn .ace_string.ace_regexp {\n  color:#CF5628;\n}\n\n.ace-dawn .ace_comment {\n  font-style:italic;\ncolor:#5A525F;\n}\n\n.ace-dawn .ace_variable {\n  color:#234A97;\n}\n\n.ace-dawn .ace_markup.ace_underline {\n    text-decoration:underline;\n}\n\n.ace-dawn .ace_markup.ace_heading {\n  color:#19356D;\n}\n\n.ace-dawn .ace_markup.ace_list {\n  color:#693A17;\n}";var dom=require("../lib/dom");dom.importCssString(exports.cssText,exports.cssClass)})