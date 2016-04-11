package com.kjh.service.user.impl;

import com.kjh.dao.user.UserDao;
import com.kjh.dao.user.impl.UserDaoImpl;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/3/20.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;
    @Override
    public User getUserById(int userId) {
        User user = this.userDao.getUserById(userId);
        return user;
    }

    public ResultMessage login(User user){
        ResultMessage resultMessage = new ResultMessage();
        User userForLogin = this.userDao.login(user);
        if(userForLogin==null){
            resultMessage.setResultInfo("42001");
        }else{
            resultMessage.setResultInfo("1");
        }
        resultMessage.setServiceResult(true);
        return resultMessage;
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


}
