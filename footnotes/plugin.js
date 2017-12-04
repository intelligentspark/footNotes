tinymce.PluginManager.add('footnotes', function(editor) {

    function replaceTmpl(str, data) {
        var result = str;
        for (var key in data) {
            result = result.replace(/({FOOTNOTE_INDEX})/g,data[key]);
        }
        return result;
    }

    function showDialog() {
        var selectedNode = editor.selection.getNode(), name = '',
            isFootNotes = selectedNode.tagName == 'SPAN' && editor.dom.getAttribute(selectedNode, 'class') === 'fnoteWrap';

        var selectIndex = (function(){
            if (selectedNode.className == 'fnoteWrap') {
                var num = selectedNode.childNodes[0].firstChild.nodeValue.replace(/[^0-9]/g,'');
                return num;
            }
            else {
                return selectedNode.childNodes[0];
            }
        }());

        if (isFootNotes) {
            name = selectedNode.name || $(selectedNode.childNodes[0]).getParent().getAttribute('name') || '';
            console.log(name);
        }

        editor.windowManager.open({
            title: "Insert a contents",
            id: 'footnote-dialog',
            body: {
                type: 'textbox',
                name: 'name',
                multiline: true,
                minWidth: 520,
                minHeight: 100,
                value : name
            },
            onSubmit: function(e) {
                var newfootnoteContent = e.data.name,
                    fixFootnoteContent = (function () {
                        return newfootnoteContent;
                    }()),
                    htmlTemplate = '&nbsp;<span class="fnoteWrap" id="wk_ft{FOOTNOTE_INDEX}" data-footnote-id="{FOOTNOTE_INDEX}" contenteditable="false">' +
                        '<i class="fa fa-sticky-note" aria-hidden="true"></i>' +
                        '<span class="fnoteDesc" style="display:none;">'+fixFootnoteContent+'</span></span>&nbsp;',
                    totalFootNote = editor.getDoc().querySelectorAll('.fnoteWrap'),
                    totalCount = totalFootNote.length,
                    html;
                console.log(totalFootNote);

                var idx = totalCount + 1;
                html = replaceTmpl(htmlTemplate,{FOOTNOTE_INDEX : idx});
                editor.selection.collapse(0);

                editor.execCommand('mceInsertContent', false, html);

                // index realignment
                /*$(editor.id).getChildren('.fnoteBtn').forEach(function(item,idx){
                    $(item).setProperty('text',(idx+1));
                    $(item).getParent().setProperty('id','#wk_ft' + (idx +1));
                });*/
            }
        });
    }
    editor.addCommand('mceFootnotes', showDialog);
    editor.addButton("footnotes", {
        title : 'footnote',
        image : tinyMCE.baseURL + '/plugins/footnotes/img/footnotes.png',
        onclick: showDialog,
        stateSelector: 'div.fnoteWrap'
    });
});