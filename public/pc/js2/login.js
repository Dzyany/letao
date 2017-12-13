/**
 * Created by Administrator on 2017/12/12.
 */
$(function(){
    // Get plugin instance
   // bootstrap-Validator 插件中的方法
  // var bootstrapValidator = $(form).data('bootstrapValidator');

// and then call method
    //bootstrapValidator.methodName(parameters)
    //需求 校验规则：
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 用户密码长度为6-12位

    //1初始化表单验证插件
    var $form=$('form');
    $form.bootstrapValidator({
        //设置小图标
        feedbackIcons:{
            //验证成功
            valid: 'glyphicon glyphicon-ok',
            //验证失败
            invalid: 'glyphicon glyphicon-remove',
            //验证中
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置校验规则,name属性
        fields:{
            //配置username的校验规则
            username:{
                //配置username里面的所有校验
                validators:{
                    notEmpty:{
                         message:"用户名不能为空"
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"

                    },
                    //配置字符串长度
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码必须为6到12位'
                    },
                    callback:{
                        message:'密码错误'
                    }

                }

            },
            //submitHandler: function (validator, form, submitButton) {
            //    alert("submit");
            //}
        }
    });
    $form.on('success.form.bv',function(e){
        //return false;  //阻止表单提交 但ajax也不发请求
        e.preventDefault(); //阻止表单提交
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            //dataType:'json',
            data:$form.serialize(),
            success:function(info){
                //console.log(info);
                //如果登陆失败,跳转到index.html
                if(info.success){
                    //跳转到index页面
                    location.href = "index.html";
                }

                if(info.error==1000){
                    // alert(info.message);   //用户名不存在
                    //$form.data("bootstrapValidator") 用于获取插件实例,通过实例可以获取方法
                    //updateStatus('字段名','状态','显示哪一个校验内容')
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(info.error==1001){
                   // alert(info.message);   //密码错误
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID","callback");
                }
            }

        })

    });
    $("[type='reset']").on('click',function(){
        $form.data('bootstrapValidator').resetForm();

    })


})