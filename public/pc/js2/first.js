/**
 * Created by Administrator on 2018/1/15.
 */

$(function(){
    var page=1;
    var pageSize=5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('tbody').html(template('tmp_data',info)) ;
            }
        });
    }

    render();

    //添加模态框
    $('.btn_addFirst').on('click',function(){
        $('#addFirst').modal('show');
    });

    //bootstrap-validator插件会在表单提交的时候进行校验，
    // 如果校验成功了，表单会继续提交，
    // 但是如果校验失败了，就会阻止表单的提交。
    $('#form1').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                 validators:{
                     notEmpty:{
                         message:'不能为空'
                     }
                 }
            }
        }

    });
    $('#form1').on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var categoryName=$('#form1').serialize();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data: categoryName,

            dataType:'json',
            success:function(info){
                console.log(info);

                if(info.success){
                    $('#addFirst').modal('hide');
                    render();
                }

            }


        })
    });
});