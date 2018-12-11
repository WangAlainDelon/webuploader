// 文件上传
jQuery(function() {
    /*对于一些控件的初始化*/
    var $ = jQuery,
        //待上传的文件列表
        $list = $('#thelist'),
        //开始上传按钮
        $btn = $('#ctlBtn'),
        //显示状态 上传成功、上传失败。。
        state = 'pending',
        //上传的方法
        uploader;

    uploader = WebUploader.create({

        // 不压缩image
        resize: false,

        // 为true 文件则自动上传
        auto: false,

        // swf文件路径  使用flash才会用到
        // swf: BASE_URL + '/js/Uploader.swf',

        // 文件接收服务端。就是上传文件走的url
        server: '/upload',

        // 选择文件的按钮。可选。
        pick: '#picker',

        // 默认所有都可选，过滤文件类型参考网址： http://www.cnblogs.com/s.sams/archive/2007/10/10/918817.html
        // 只允许选择图片文件。
        /*accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/!*'
        },*/

        // 只允许选择Excel文件。
     /*   accept: {// 只允许选择Excel文件格式
            title: 'Excel',
            extensions: 'xls,xlsx',
            mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  /!*限制选择文件的类型*!/
        }*/
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        $list.append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>' );
    });

    // 文件上传过程中创建进度条实时显示。
    // 进度条我引用了bootStrap.css来进行展示,webuploader.css是不带的
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 上传成功
    uploader.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    // 上传失败
    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    // 开始上传 按钮点击事件 触发 上传方法
    // 如果开启了自动上传，则不必要
    $btn.on( 'click', function() {
        if ( state === 'uploading' ) {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
});
