package com.kjh.controller.menu;

import com.kjh.domain.ResultMessage;
import com.kjh.domain.information.Information;
import com.kjh.domain.menuitem.MenuItem;
import com.kjh.service.information.InformationService;
import com.kjh.service.menu.MenuService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/15.
 */
@Controller
@RequestMapping("/menu")
public class MenuController {
    Logger logger = Logger.getLogger(MenuController.class);
    @Resource
    private MenuService menuService;
    @Resource
    private  ResultMessage resultMessage;

    @RequestMapping("/getCurrentUserMenuItemTree")
    public @ResponseBody
    ResultMessage getCurrentUserMenuItemTree() {
        logger.info("进入方法getCurrentUserMenuItemTree");
        resultMessage = menuService.getCurrentUserMenuItemTree();
        logger.info("退出方法getCurrentUserMenuItemTree");
        return  resultMessage;
    }
}
