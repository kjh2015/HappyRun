package com.kjh.service.user.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kjh.dao.user.UserDao;
import com.kjh.dao.user.impl.UserDaoImpl;
import com.kjh.domain.Pagination;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;
import com.kjh.service.user.UserService;
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
    private static final  int pageSize = 5;
    @Resource
    private UserDao userDao;
    @Resource
    private ResultMessage resultMessage;
    @Override
    public User getUserById(int userId) {
        User user = this.userDao.getUserById(userId);
        return user;
    }

    public ResultMessage login(User user){
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

    @Override
    public ResultMessage pageUser(Pagination page) {
        PageHelper.startPage(page.getStartPage(),5);
        List<User> userList = userDao.pageUser();
        PageInfo<User> pageInfo = new PageInfo<User>(userList);
        Pagination pageForReturn = new Pagination();
        pageForReturn.setPageSize(5);
        pageForReturn.setStartPage(page.getStartPage());
        pageForReturn.setPageList(pageInfo.getList());
        pageForReturn.setTotalCount(Integer.valueOf(pageInfo.getTotal()+""));
        resultMessage.setResultInfo("1");
        resultMessage.setServiceResult(true);
        Map<String,Object> parm = new HashMap<String,Object>();
        parm.put("pageInfo",pageForReturn);
        resultMessage.setResultParm(parm);
        return resultMessage;
    }


}
