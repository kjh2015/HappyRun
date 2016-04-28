package com.kjh.domain.catagory;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
@NameStyle(Style.normal)
@Table(name = "t_catagory")
public class CataGory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer catagoryid;
    private  String catagoryname;
    private Boolean isdelete;
}
