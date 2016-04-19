package com.kjh.service.information.impl;

import com.kjh.dao.information.InformationDao;
import com.kjh.domain.information.Information;
import com.kjh.service.information.InformationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2016/4/13.
 */
@Service("informationService")
public class InformationServiceImpl implements InformationService {
    @Resource
    private InformationDao informationDao;

    @Override
    public List<Information> findAllInformation() {
        return informationDao.findAllInformation();
    }

    @Override
    public List<Information> pageInformation() {
        return informationDao.pageInformation();
    }
}
