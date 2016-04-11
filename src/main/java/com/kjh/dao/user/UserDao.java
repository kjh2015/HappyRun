package com.kjh.dao.user;
import com.kjh.domain.user.User;
/**
 * Created by Administrator on 2016/3/20.
 */

public interface UserDao {
    User getUserById(int userid);
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int userid);
    User login(User user);
}
