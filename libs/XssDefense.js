// 前端xss预防
var XssDefense = {
    //浏览器内部转换器实现html转码
    htmlEncode : function(str){
        var temp = document.createElement("div");
        (temp.textContent != undefined) ? (temp.textContent = str) : (temp.innerText = str);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },

    //正则表达式实现html转码
    htmlEncodeByRegExp : function (str) {
        if(str.length == 0)
            return "";
        var output = str.replace(/&/g, "&#38;");
        output = output.replace(/</g, "&#60;");
        output = output.replace(/>/g, "&#62;");
        output = output.replace(/"/g, "&#34;");
        output = output.replace(/'/g, "&#39;");
        return output;
    },

    //删除所有标签<>
    removeAllLabel : function (str) {
        var start=null, end=null;
        var arr = [];
        for(var i=0; i<str.length; i++) {
            if(start!=null && str.charAt(i)=='>')
                end = i;
            if(start==null && str.charAt(i)=='<')
                start = i;
            if(start!=null && end!=null){
                arr.push({start: start, end: end});
                start=null;
                end=null;
            }
            if(i == str.length-1 && start != null)
                arr.push({start: start, end: i});
        }
        var output = "";
        for(var i=0; i<arr.length; i++){
            if(i == 0 && arr[0].start != 0)
                output += str.slice(0, arr[i].start);
            else if(i != 0)
                output += str.slice(arr[i-1].end+1, arr[i].start);
            if(i == arr.length-1  && arr[i].end!=arr.length-1)
                output += str.slice(arr[i].end+1, str.length);
        }
        return output;
    }
};