package com.kjh.domain.user;

import lombok.Data;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class UserInfo {
    private Integer userinfoid;
    private Integer userid;
    private String nickname;
    private String avatar;
    private String medal;
    private Integer accumulatedkilometers;
    private Integer totaltime;
    private Integer cumulativeconsumption;
    private Integer runningkilometersrecord;
    private Integer fastestspeed;
    private Integer longestdistance;
    private Integer longesttime;


}
