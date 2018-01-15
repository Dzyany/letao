/**
 * Created by Administrator on 2017/12/14.
 */
$(function(){
    //参数设置
    NProgress.configure({ showSpinner: false });  //让加载的小圈不显示
    //页面加载进度条
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },300);
    });

    //全屏显示
    $('#menu').on('click',function(){

            $('.side').toggleClass('now');
            $('.main').toggleClass('now');
            $('.main_top').toggleClass('now');

    });

    //判断是否登录
    if(location.href.indexOf('login.html')==-1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(info){
              //  console.log(info);
                if(info.error){
                    location.href="login.html";
                }
            },
            error:function(){

            }
        })
    }
     //点击退出显示退出模态框
     $('#btn_exit').on('click',function(){
         //alert('haha');
         //    调用退出模态事件
       $('#myModal').modal('show');
     });
    //确认退出登录
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
   //侧边栏二级菜单点击切换显示
    $('.nav li>a').on('click',function(){
        $(this).next().slideToggle();
    })


});
