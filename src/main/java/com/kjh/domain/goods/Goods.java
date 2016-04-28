package com.kjh.domain.goods;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
@NameStyle(Style.normal)
@Table(name = "t_goods")
public class Goods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer goodsid;
    private  String goodsname;
    private  Double sellingprice;
    private  String images;
    private Integer status;
    private  Boolean isdelete;
    private  Integer catagoryid;
    private  String catagoryname;
    private Date registerdate;
    private  Double price;
    private  Integer stock;
    private String goodsdesc;
}
