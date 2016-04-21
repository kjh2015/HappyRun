package com.kjh.controller.user;

import com.kjh.domain.Pagination;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.impl.UserServiceImpl;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;


@Controller
@RequestMapping("/user")
public class UserController {
    Logger logger = Logger.getLogger(UserController.class);
    @Resource
    private UserServiceImpl userService;

    private ResultMessage resultMessage;

    @RequestMapping("/showUser")
    public String toIndex(HttpServletRequest request, HttpServletResponse response) {
        int userId = Integer.parseInt(request.getParameter("userid"));
        User user = this.userService.getUserById(userId);
        return "index";
    }

    /**
     * 登录.
     *
     * @param request  请求.
     * @param response 响应.
     */
    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    @ResponseBody
    public final ResultMessage login(@RequestBody User user) {
        logger.info("进入方法login");
        resultMessage = userService.login(user);
        System.out.println("user" + user);
        Map<String, Object> parm = new HashMap<String, Object>();
        parm.put("user", user);
//            String username = request.getParameter("username");
//            String password = request.getParameter("password");
//        System.out.println("username"+username);
//        System.out.println("password"+password);
        resultMessage.setResultParm(parm);
        logger.info("退出方法login");
        return resultMessage;
    }

    @RequestMapping(value = "/pageUser.do", method = RequestMethod.POST)
    @ResponseBody
    public final ResultMessage pageUser(@RequestBody Pagination pageInfo) {
        logger.info("进入方法pageUser");
        resultMessage = userService.pageUser(pageInfo);
        logger.info("退出方法pageUser");
        return resultMessage;
    }

    @RequestMapping(value = "/uploadFile.do", method = RequestMethod.POST)
    @ResponseBody
    public final ResultMessage uploadFile(MultipartFile file,HttpServletRequest request) {
        logger.info("进入方法uploadFile");
        if(!file.isEmpty()){
            ServletContext sc = request.getSession().getServletContext();
            String dir = sc.getRealPath("/upload");
            String filename = file.getOriginalFilename();

           String  fileName = UUID.randomUUID().toString();

            try {
                FileUtils.writeByteArrayToFile(new File(dir,filename), file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }


            System.out.println("upload over. "+ filename);
        }
        logger.info("退出方法uploadFile");
        return resultMessage;
    }

}
