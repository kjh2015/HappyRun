package com.kjh.dao.information;

import com.kjh.domain.information.Information;

import java.util.List;

/**
 * Created by Administrator on 2016/4/13.
 */
public interface InformationDao {
    List<Information> findAllInformation();
    List<Information> pageInformation();
}
