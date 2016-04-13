package com.kjh.domain.cart;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class CartItem {
    private Integer  cartitemid;
    private Integer cartid;
    private  Integer goodsid;
    private  String goodsname;
    private  Integer pieces;
    private  Double sellingprice;
    private BigDecimal subtotal;
    private  Integer status;


}
