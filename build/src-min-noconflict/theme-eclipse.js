ace.define("ace/theme/eclipse",["require","exports","module","ace/lib/dom"],function(require,exports,module){exports.isDark=!1,exports.cssText=".ace-eclipse .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-eclipse .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-eclipse .ace_gutter {\n  background: rgb(227, 227, 227);\n  border-right: 1px solid rgb(159, 159, 159);\n  color: rgb(136, 136, 136);\n}\n\n.ace-eclipse .ace_print_margin {\n  width: 1px;\n  background: #b1b4ba;\n}\n\n.ace-eclipse .ace_fold {\n    background-color: rgb(60, 76, 114);\n}\n\n.ace-eclipse .ace_text-layer {\n  cursor: text;\n}\n\n.ace-eclipse .ace_cursor {\n  border-left: 2px solid black;\n}\n\n.ace-eclipse .ace_line .ace_storage,\n.ace-eclipse .ace_line .ace_keyword,\n.ace-eclipse .ace_line .ace_variable {\n  color: rgb(127, 0, 85);\n}\n\n.ace-eclipse .ace_line .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-eclipse .ace_line .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-eclipse .ace_line .ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-eclipse .ace_line .ace_string {\n  color: rgb(42, 0, 255);\n}\n\n.ace-eclipse .ace_line .ace_comment {\n  color: rgb(63, 127, 95);\n}\n\n.ace-eclipse .ace_line .ace_comment.ace_doc {\n  color: rgb(63, 95, 191);\n}\n\n.ace-eclipse .ace_line .ace_comment.ace_doc.ace_tag {\n  color: rgb(127, 159, 191);\n}\n\n.ace-eclipse .ace_line .ace_constant.ace_numeric {\n}\n\n.ace-eclipse .ace_line .ace_tag {\n  color: rgb(63, 127, 127);\n}\n\n.ace-eclipse .ace_line .ace_type {\n  color: rgb(127, 0, 127);\n}\n\n.ace-eclipse .ace_line .ace_xml_pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-eclipse .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n\n.ace-eclipse .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-eclipse .ace_line .ace_meta.ace_tag {\n  color:rgb(63, 127, 127);\n}\n\n.ace-eclipse .ace_entity.ace_other.ace_attribute-name {\n  color:rgb(127, 0, 127);\n}\n.ace-eclipse .ace_marker-layer .ace_step {\n  background: rgb(255, 255, 0);\n}\n\n.ace-eclipse .ace_marker-layer .ace_active_line {\n  background: rgb(232, 242, 254);\n}",exports.cssClass="ace-eclipse";var dom=require("../lib/dom");dom.importCssString(exports.cssText,exports.cssClass)})