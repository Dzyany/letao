/**
 * Created by Administrator on 2017/12/14.
 */
$(function(){
    //参数设置
    NProgress.configure({ showSpinner: false });  //让加载的小圈不显示

    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },1000);
    });

    //$('#menu').on('click',function(){
    //    $('.side').toggle();
    //    $('.main').css('padding-left','0');
    //});

    $('#menu').on('click',function(){

            $('.side').toggleClass('now');
            $('.main').toggleClass('now');

    });

    //判断是否登录
    if(location.href.indexOf('login.html')==-1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(info){
                console.log(info);
                if(info.error){
                    location.href="login.html";
                }
            },
            error:function(){

            }
        })
    }
     $('#btn_exit').on('click',function(){
         //alert('haha');
         //    调用退出模态事件
       $('#myModal').modal('show');
     });

    $('.confirm').on('click',function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href='login.html';
                }
            }
        })
    });

    $('.nav li>a').on('click',function(){
        $(this).next().slideToggle();
    })


});
