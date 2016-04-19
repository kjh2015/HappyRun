package com.kjh.controller.information;

import com.kjh.domain.ResultMessage;
import com.kjh.domain.information.Information;
import com.kjh.domain.user.User;
import com.kjh.service.information.InformationService;
import com.kjh.service.user.impl.UserServiceImpl;
import org.apache.log4j.Logger;
import org.apache.log4j.or.ObjectRenderer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/13.
 */
@Controller
@RequestMapping("/information")
public class InformationController {
    Logger logger = Logger.getLogger(InformationController.class);
    @Resource
    private InformationService informationService;

    @Resource
    private ResultMessage resultMessage;

    @RequestMapping("/getAllInfo")
    public @ResponseBody  ResultMessage findAllInformation() {
        logger.info("进入方法findAllInformation");
        List<Information> informationList = informationService.findAllInformation();
        Map<String, Object> parm = new HashMap<String, Object>();
        parm.put("informationList", informationList);
        resultMessage.setResultParm(parm);
        resultMessage.setServiceResult(true);
        logger.info("退出方法findAllInformation");
        return  resultMessage;
    }

    @RequestMapping("/pageInfo")
    public @ResponseBody  ResultMessage pageInformation() {
        logger.info("pageInformation");
        List<Information> informationList = informationService.pageInformation();
        Map<String, Object> parm = new HashMap<String, Object>();
        parm.put("informationList", informationList);
        resultMessage.setResultParm(parm);
        resultMessage.setServiceResult(true);
        logger.info("pageInformation");
        return  resultMessage;
    }
}
