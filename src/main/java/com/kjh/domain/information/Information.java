package com.kjh.domain.information;

import lombok.Data;

import java.util.Date;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class Information {
    private  Integer informationid;
    private  String informationtitle;
    private  String informationdesc;
    private  String informationcontent;
    private  String informationimages;
    private Date informationtime;
}
