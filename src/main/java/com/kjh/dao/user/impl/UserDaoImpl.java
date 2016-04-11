package com.kjh.dao.user.impl;

import com.kjh.dao.user.UserDao;
import com.kjh.domain.user.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/3/20.
 */
//@Component(value = "userDaoImpl")
public class UserDaoImpl  {
    @Resource
    private SqlSessionFactory factory;

    private SqlSession session ;

    private SqlSession createSession() {
        session = factory.openSession();
        return session;
    }

    public User getUserById(int userid) {
        createSession();
        System.out.println(session);
        return session.getMapper(UserDao.class).getUserById(userid);

    }


}
