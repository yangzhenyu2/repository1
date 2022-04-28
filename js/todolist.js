$(function() {
    load();
    // 1.将输入框中保存到本地存储 var todoulist = [{title: "xxx", done: false}]
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请您输入事项!")
            } else {
                var localdata = getData();
                localdata.push({ title: $(this).val(), done: false })
                saveData(localdata);
                load();
            }
            $(this).val("");
        }
    });

    //删除模块  动态的 要用事件委托
    $("ul,ol").on("click", "a", function() {
        var localdata = getData();
        var index = $(this).attr("id");
        localdata.splice(index, 1);
        saveData(localdata);
        load();
    });

    //改变done 状态
    $("ul,ol").on("click", "input", function() {
        var localdata = getData();

        var index = $(this).siblings("a").attr("id");
        localdata[index].done = $(this).prop("checked");
        saveData(localdata);
        load();


    });


    //获得数据 变成[{title: "xxx", done: false}]数组形式
    function getData() {
        var data = localStorage.getItem("todolist")
        if (data === null) {
            return []
        } else {
            return JSON.parse(data)
        }
    };

    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    };

    function load() {
        var data = getData(); //[{title: "xxx", done: false}]数组形式
        $("ol, ul").empty(); //先清空
        //遍历数组
        var todocount = 0;
        var donecount = 0;
        $.each(data, function(i, n) {
            if (n.done === false) {
                $("ol").prepend("<li><input type='checkbox'  > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todocount++;
            } else {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                donecount++
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);

    }


});