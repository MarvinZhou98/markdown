initEditor();


/**
 *  初始化编辑框
 */
function initEditor() {
    /* 初始化编辑器 */
    var editor = ace.edit("md-editor");

    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setTabSize(4);
    editor.getSession().setUseWrapMode(true);

    //加载本地缓存数据
    editor.setValue(localStorage.localData || '');

    //解析
    parseMarkdown(editor);

    //绑定change事件
    editor.getSession().on("change", function (e) {
        parseMarkdown(editor);
    });

}

/**
 *  解析markdown
 */
function parseMarkdown(editor) {
    var viewer = $("#md-viewer");
    var data = editor.getValue();

    //保存
    localStorage.localData = data;

    //解析
    data = marked(data);
    viewer.html(data);

    //高亮代码
    $("pre > code", viewer).each(function () {
        hljs.highlightBlock(this);
    });
}

