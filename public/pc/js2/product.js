/**
 * Created by Administrator on 2018/1/14.
 */
$(function(){
    var page=1;
    var pageSize=5;
    var pic_res;
    var pics=[];
    var a;
    var product;

    function render (){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
              page:page,
              pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $('tbody').html(template('tmp_date',info));
                //分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,   //默认值bootstrapMajorVersion:2
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //console.log(p);
                        page=p;
                        render();

                    },
                    //设置所有操作按钮是显示
                    shouldShowPage:'false',
                   // useBootstrapTooltip:true,
                    //控制每个操作按钮的显示文字
                    itemTexts:function(type, page, current){
                        //console.log(type, page, current);
                        switch (type){
                            case'next':
                                return'下一页';
                            case 'last':
                                return'最后一页';
                            case 'prev':
                                return'上一页';
                            case 'first':
                                return '第一页';
                            case 'page':
                                return page;
                        }

                    },

                    //控制页标签上的title
                    tooltipTitles:function (type, page, current){
                        switch (type){
                            case'next':
                                return'下一页';
                            case 'last':
                                return'最后一页';
                            case 'prev':
                                return'上一页';
                            case 'first':
                                return '第一页';
                            case 'page':
                                return page;
                        }
                    }

                });


            }
        })
    }
    render();


    $('#add_pro').on('click',function(){
        //显示模态框  添加商品信息
        $('#my_pro_Modal').modal('show');

        //使用模板动态渲染二级分类
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $('select').html(template('tmp_pro',info))
            }
        });

    });


    //给下拉框添加点击事件
    $('select').on('change',function(){
        //console.log($(this).find('option:selected').attr('data-cate_id'));
        //console.log($(this).val());
        a =$(this).find('option:selected').attr('data-cate_id');
        $('#cate_Id').attr('value',a);
       // console.log($("[name='brandId']").val());
        //当用户选择时做验证
         $('form').data('bootstrapValidator').updateStatus('brandId','VALID');

        //  $(this).val();
        // $('#cate_Id').attr('value', $(this).val());
    });

    // 表单验证事件
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    }

                    //正则校验

                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    });

    //初始化图片上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            if(pics.length>=3){
                return;
            }
             pic_res=data.result;
             pics.push(pic_res);
            //显示图片  appendChild是js 方法
           $('.img_box').append('<img src='+pic_res.picAddr+' >'); //

            if(pics.length===3){
                //BootstrapValidator在用户输入内容的时候，会做校验
               $('form').data('bootstrapValidator').updateStatus('productLogo','VALID');
            }else{
                $('form').data('bootstrapValidator').updateStatus('productLogo','INVALID');

            }
        }
    });


    ////添加商品信息
    $('#form1').on('success.form.bv',function (e) {
        //e.preventDefault();
        ////使用ajax提交逻辑
        //product接口需要的数据
        var product=$('form').serialize();
        //&picName1="1.jpg"&picAddr1="images/1.jpg"
        //&picName2="2.jpg"&picAddr2="images/2.jpg"
        //&picName3="3.jpg"&picAddr3="images/3.jpg"
        product+='&picName1="pics[0].picName"&picAddr1="pics[0].picAddr"';
        product+='&picName1="pics[1].picName"&picAddr1="pics[1].picAddr"';
        product+='&picName1="pics[2].picName"&picAddr1="pics[2].picAddr"';
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:product,
            success:function(info){
                //console.log(info);
                if(info.success){
                    $('#my_pro_Modal').modal('hide');
                    render();
                }
            }
        })
    });
        //用于测试
    //$('.btn_addPro').on('click',function(){
    //    // console.log($('form').serialize());
    //      console.log(pics);
    //   // product= $('form').serialize();
    //
    //});
    //
});