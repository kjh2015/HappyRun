package com.kjh.service.user.impl;

import com.kjh.dao.user.UserDao;
import com.kjh.dao.user.impl.UserDaoImpl;
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

//    @Resource(name = "userDaoImpl")
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}
