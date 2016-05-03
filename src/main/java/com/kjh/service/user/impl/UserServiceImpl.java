package com.kjh.service.user.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kjh.dao.user.UserDao;
import com.kjh.domain.Pagination;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/20.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    private static final int pageSize = 5;
    @Resource
    private UserDao userDao;
    @Resource
    private ResultMessage resultMessage;

    @Override
    public User getUserById(int userId) {
        User user = this.userDao.getUserById(userId);
        return user;
    }


    @Override
    public void insertUser(User user) {
        userDao.insertUser(user);
    }

    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    @Override
    public void deleteUser(int userid) {
        userDao.deleteUser(userid);
    }

    @Override
    public User getUserByName(String username) {
        User user = userDao.getUserByName(username);
        return user;
    }

    @Override
    public ResultMessage pageUser(Pagination page) {
        PageHelper.startPage(page.getStartPage(), 5);
        List<User> userList = userDao.pageUser();
        PageInfo<User> pageInfo = new PageInfo<User>(userList);
        Pagination pageForReturn = new Pagination();
        pageForReturn.setPageSize(5);
        pageForReturn.setStartPage(page.getStartPage());
        pageForReturn.setPageList(pageInfo.getList());
        pageForReturn.setTotalCount(Integer.valueOf(pageInfo.getTotal() + ""));
        resultMessage.setResultInfo("1");
        resultMessage.setServiceResult(true);
        Map<String, Object> parm = new HashMap<String, Object>();
        parm.put("pageInfo", pageForReturn);
        resultMessage.setResultParm(parm);
        return resultMessage;
    }

    public ResultMessage login(User user) {
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        Subject currentUser = SecurityUtils.getSubject();
        try {
            currentUser.login(token);
            resultMessage.setResultInfo("200");
            resultMessage.setServiceResult(true);
        } catch (AuthenticationException ae) {
            //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
            resultMessage.setServiceResult(false);
            //登录信息不存在
            resultMessage.setResultInfo("42002");
            ae.printStackTrace();
        }catch (Exception e){
            resultMessage.setServiceResult(false);
            resultMessage.setResultInfo(e.toString());
        }
        return resultMessage;
    }

}
