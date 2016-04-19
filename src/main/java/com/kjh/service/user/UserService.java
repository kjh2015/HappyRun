package com.kjh.service.user;

import com.kjh.domain.Pagination;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.user.User;

/**
 * Created by Administrator on 2016/3/20.
 */
public interface UserService {
     User getUserById(int userId);
     void insertUser(User user);
     void updateUser(User user);
     void deleteUser(int userid);
     ResultMessage pageUser(Pagination pageInfo);
}
