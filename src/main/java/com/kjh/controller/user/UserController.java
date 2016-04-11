package com.kjh.controller.user;

import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.impl.UserServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("/user")
public class UserController {
    Logger logger = Logger.getLogger(UserController.class);
    @Resource
    private UserServiceImpl userService;

    @Resource
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
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    @ResponseBody
    public final void login(@RequestBody User user) {
        logger.info("进入方法login");
        resultMessage = userService.login(user);

        logger.info("退出方法login");
    }


}
