package com.kjh.domain.order;

import lombok.Data;

import java.util.Date;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class Order {
    private  Integer orderid;
    private  String ordernum;
    private  Integer orderstatus;
    private  Integer orderitemid;
    private  String name;
    private  String address;
    private  String telephone;
    private  Integer receiverid;
    private  String remark;
    private Date ordertime;
    private  Integer isdelete;
}
