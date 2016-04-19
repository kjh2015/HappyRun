package com.kjh.dao.user;
import com.kjh.domain.Pagination;
import com.kjh.domain.user.User;

import java.util.List;

/**
 * Created by Administrator on 2016/3/20.
 */

public interface UserDao {
    User getUserById(int userid);
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int userid);
    User login(User user);
    List<User> pageUser();
}
