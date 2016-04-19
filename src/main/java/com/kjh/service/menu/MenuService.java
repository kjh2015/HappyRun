package com.kjh.service.menu;

import com.kjh.domain.ResultMessage;
import com.kjh.domain.menuitem.MenuItem;

import java.util.List;

/**
 * Created by Administrator on 2016/4/15.
 */
public interface MenuService {
    ResultMessage getCurrentUserMenuItemTree();
}
