package com.kjh.controller.user;

import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.impl.UserServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


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
    @RequestMapping(value = "/login.do",method = RequestMethod.POST)
    @ResponseBody
    public final ResultMessage login(@RequestBody User user) {
        logger.info("进入方法login");
        resultMessage = userService.login(user);
        System.out.println("user"+user);
        Map<String,Object> parm = new HashMap<String, Object>();
        parm.put("user",user);
//            String username = request.getParameter("username");
//            String password = request.getParameter("password");
//        System.out.println("username"+username);
//        System.out.println("password"+password);
        resultMessage.setResultParm(parm);
        logger.info("退出方法login");
        return resultMessage;
    }


}
