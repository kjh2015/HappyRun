package com.kjh.service.menu.impl;

import com.kjh.dao.menu.MenuDao;
import com.kjh.domain.ResultMessage;
import com.kjh.domain.menuitem.MenuItem;
import com.kjh.service.menu.MenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/15.
 */
@Service("menuService")
public class MenuServiceImpl implements MenuService {
    @Resource
    private MenuDao menuDao;

    @Resource
    private ResultMessage resultMessage;

    @Override
    public ResultMessage getCurrentUserMenuItemTree() {
        List<MenuItem> menuItemList = menuDao.getCurrentUserMenuItemTree();
        resultMessage.setServiceResult(true);
        Map<String,Object> parm = new HashMap<String,Object>();
        parm.put("menuItemList",menuItemList);
        resultMessage.setResultParm(parm);
        return resultMessage;
    }
}
