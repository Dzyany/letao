/**
 * Created by Administrator on 2017/12/14.
 */
;(function(){
    var page=1;
    var pageSize=5;
    function render() {
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var html = template('tmp_data', info);
                $('tbody').html(html);
                //分页标签的触发事件
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage:page,
                    //设置控件显示的页码数
                    numberOfPages: 10,
                    //设置总页数
                    totalPages: info.total / pageSize,
                    //为操作按钮绑定click事件
                    onPageClicked:function(event, originalEvent, type, p){
                        page=p;
                        render();

                    }
                });
            }

        });

    }
    render();

    //启用禁用模态框
    $('tbody').on('click','button',function(){
        $('#myModal').modal('show');
        var id=$(this).parents('tr').data('id');
        var isDelete=$(this).parent().data('isdel')=='1'?'0':'1';

        //console.log($(this).parents('tr').data('id'));
        $('.confirm_qy').off().on('click',function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },

                success:function(info){
                    render();
                }
            });
            $('#myModal').modal('hide');
        })

    });

//

})();