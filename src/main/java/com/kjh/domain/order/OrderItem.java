package com.kjh.domain.order;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class OrderItem {
    private  Integer orderitemid;
    private  Integer goodsid;
    private  Double sellingprice;
    private  Integer pieces;
    private BigDecimal subtotal;
    private  String goodsname;
    private  Integer orderid;
}
