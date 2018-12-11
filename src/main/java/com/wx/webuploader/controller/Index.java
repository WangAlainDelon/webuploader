package com.wx.webuploader.controller;
import com.google.common.io.Files;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Controller
public class Index {
    @RequestMapping("/index")
    public String index()
    {
        return "videoup";
    }

    @RequestMapping("/upload")
    @ResponseBody
    public String uploadFile(@RequestPart("file") MultipartFile file) throws IOException {
        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取项目的路径 + 拼接得到文件要保存的位置
        String filePath = System.getProperties().getProperty("user.dir") + "\\src\\main\\resources\\file\\" + fileName;
        System.out.println(filePath);
        // 创建一个文件的对象
        File file1 = new File(filePath);
        // 创建父文件夹
        Files.createParentDirs(file1);
        // 把上传的文件复制到文件对象中
        file.transferTo(file1);
        return "upload_file";
    }

}
