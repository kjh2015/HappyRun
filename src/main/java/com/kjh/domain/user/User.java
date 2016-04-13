package com.kjh.domain.user;

import lombok.Data;

/**
 * Created by Administrator on 2016/3/20.
 */
@Data
public class User {
    private Integer userid;
    private String username;
    private String password;
    private Integer userinfoid;
    private Integer roleid;
}
