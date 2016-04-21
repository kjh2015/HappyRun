package com.kjh.domain.cart;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class Cart {
    private Integer cartid;
    private List<CartItem> cartItemList;
    private BigDecimal subtotal;
    private Integer pieces;
    private Integer createuid;
}
