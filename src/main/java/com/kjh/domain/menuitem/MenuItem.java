package com.kjh.domain.menuitem;

import lombok.Data;

/**
 * Created by Administrator on 2016/4/13.
 */
@Data
public class MenuItem {
    private  Integer menuitemid;
    private  String menuname;
    private  Integer menuitemparentid;
    private  String  menuitemname;
    private  String menuitemrouteurl;
    private  String menuitemctrl;
    private  String menuitemurl;
}
