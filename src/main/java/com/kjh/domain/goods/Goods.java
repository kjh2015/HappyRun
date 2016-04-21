package com.kjh.domain.goods;

import lombok.Data;

import java.util.Date;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class Goods {
    private  Integer goodsid;
    private  String goodsname;
    private  Double sellingprice;
    private  String images;
    private Integer status;
    private  Integer isdelete;
    private  Integer categoryid;
    private  String categoryname;
    private Date registerdate;
    private  Double price;
    private  Integer stock;
    private  Integer  subcategoryid;
    private String subcategoryname;

}
