package com.kjh.domain.user;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.Id;
import javax.persistence.Table;


/**
 * Created by Administrator on 2016/4/13.
 */
@Data
@NameStyle(Style.normal)
@Table(name = "t_medal")
public class Medal {
    @Id
    private  Integer medalid;
    private  String medalname;
    private  String medalimage;
    private  Integer userid;
}
