/**
 * Created by Administrator on 2018/1/15.
 */
$(function(){

    //侧边栏-一级分类

    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            $('.category_lf ul').html(template('tmp_top',info)).children().eq(0).children().addClass('now');
        }
    });

    //点击一级分类显示对应的二级分类
    $('.category_lf ul').on('click','li',function(){
        $(this).siblings('li').find('a').attr('class','');
        $(this).find('a').attr('class','now');
        var id= $(this).data('id');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(info){
                $('.category_rf ul').html(template('tmp_second',info));
            }
        });
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶2
    });

    //

});

