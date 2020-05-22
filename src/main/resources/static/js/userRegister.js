var url = location.protocol + "//" + location.host + "/";

$(function () {
    $('#userRegister').bootstrapValidator({
        // 默认的提示消息
        message: '此值无效',
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //submitHandler: function (validator, form, submitButton) {
        //    // 表单提交成功时会调用此方法
        //    // validator: 表单验证实例对象
        //    // form  jq对象  指定表单对象
        //    // submitButton  jq对象  指定提交按钮的对象
        //},
        submitButtons: '#userReg',
        // live: 'submitted',// 此处设置为点击提交时，再触发验证
        fields: {
            mobilePhone: {
                message: '手机号码验证失败',
                validators: {
                    notEmpty: {  //检查值是否为空
                        message: '手机号码不能为空',
                    },
                    regexp: {    //检查值是否与给定的 Javascript 正则表达式匹配
                        regexp: /^1[356789][0-9]{9}$/,
                        message: '手机号码格式有误',
                    },
                    threshold: 11, //有十个字符以上才发送ajax请求
                    remote: {     //通过Ajax请求执行远程检查
                        url: url + 'checkPhoneNum',   // 远程 URL , 如果要使用动态 URL，请使用回调
                        /*
                        url: function(validator) {
                            // validator is BootstrapValidator instance
                            return 'the URL';
                         }
                         */
                        message: '该手机号码已被注册',
                        //name : , 需要验证的字段的名称
                        delay: 1000, //ajax刷新时间是1秒钟一次  远程验证器创建的 Ajax 请求仅在延迟持续时间内触发一次。
                        type: 'POST', //默认情况下，从 v0.5.2 开始，类型选项为 GET。
                        data: function () {    //自定义提交数据
                            return {
                                mobilePhone: $("#mobilePhone").val()
                            }
                        }
                    }
                }
            },
            userName: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空',
                    },
                    different: {
                        field: 'password',
                        message: '用户名和密码不能相同'
                    },
                    threshold: 1,
                    remote: {
                        url: url + 'checkUsername',
                        message: '该用户名已被注册',
                        delay: 1000, //ajax刷新时间是1秒钟一次 远程验证器创建的 Ajax 请求仅在延迟持续时间内触发一次。
                        type: 'POST', //默认情况下，从 v0.5.2 开始，类型选项为 GET。
                        data: function () {
                            return {
                                userName: $("#userName").val()
                            }
                        }
                    }
                }
            },
            password: {
                message: '密码验证失败',
                validators: {
                    notEmpty: {
                        message: '密码不能为空',
                    },
                    stringLength: { //验证字符串的长度
                        min: 6,
                        message: '密码长度至少为6位',
                    },
                    identical: {    //检查该值是否与特定字段的值相同
                        field: 'repassword',
                        message: '两次输入的密码不相符'
                    }
                }
            },
            repassword: {
                message: '密码验证失败',
                validators: {
                    notEmpty: {
                        message: '密码不能为空',
                    },
                    stringLength: {
                        min: 6,
                        message: '密码长度至少为6位',
                    },
                    identical: {
                        field: 'password',
                        message: '两次输入的密码不相符'
                    }
                }
            },
            latitude: {
                validators: {
                    notEmpty: {  //检查值是否为空
                        message: '不能为空',
                    },
                    between: {    //检查输入值是否介于（严格或不严格）两个给定数字之间
                        min: -90,
                        max: 90,
                        message: '纬度必须在-90.0和90.0之间'
                    }
                }
            },
            longitude: {
                validators: {
                    notEmpty: {  //检查值是否为空
                        message: '不能为空',
                    },
                    between: {        //检查输入值是否介于（严格或不严格）两个给定数字之间
                        min: -180,
                        max: 180,
                        message: '经度必须在-180.0和180.0之间'
                    }
                }
            },
            'languages': {
                validators: {
                    choice: { //检查复选框的数量是否小于或大于给定数字
                        // 如果设置了multiple="multiple"属性  验证器还支持select元素
                        min: 2,
                        max: 4,
                        message: '请选择2 - 4个你擅长的编程语言'
                    }
                }
            },
            'editors': {
                validators: {
                    choice: { //检查复选框的数量是否小于或大于给定数字
                        // 如果设置了multiple="multiple"属性  验证器还支持select元素
                        min: 2,
                        max: 3,
                        message: '请选择2 - 3个使用最多的编辑器'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {  //检查值是否为空
                        message: '不能为空',
                    },
                    emailAddress: {
                        message: '不是一个有效的电子邮件地址'
                    }
                }
            }
        }
    })
})

//注册提交
function userRegister() {
    //为了防止误操作，比如实时验证通过后，用又返回修改数据，导致数据错误，用于验证两次输入密码是否一致的时候，
    //$('#userRegister').data("bootstrapValidator").resetForm();//重置表单所有验证规则，下一步再触发验证
    $("#userRegister").data("bootstrapValidator").validate();//手动触发全部验证
    var flag = $("#userRegister").data("bootstrapValidator").isValid();//获取当前表单验证状态
    // console.log(flag);
    if (flag) {//验证通过
        //提交表单数据
        $.ajax({
            type: "POST",
            url: url + "confirmUserReg",
            data: $('#userRegister').serialize(),
            dataType: "json",
            success: function (result) {
                if (result.code == 200) {
                    $('#myModal').modal({ //显示跳转框
                        show: true,
                        backdrop: 'static'
                    });
                } else {
                    var error_name;
                    if (result.extend.ERROR != undefined) {
                        error_name = result.extend.ERROR;
                        alert(error_name);
                    }
                }
            },
            error: function (data) {
                $('#errorModal').modal({
                    show: true,
                    backdrop: 'static'
                });
            }
        });
    }
}

