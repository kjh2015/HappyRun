package com.kjh.domain;

import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/10.
 */
@Component
public class ResultMessage {
    private Boolean serviceResult;
    private String resultInfo;
    private Map<String, Object> resultParm;

    public Boolean getServiceResult() {
        return serviceResult;
    }

    public void setServiceResult(Boolean serviceResult) {
        this.serviceResult = serviceResult;
    }

    public String getResultInfo() {
        return resultInfo;
    }

    public void setResultInfo(String resultInfo) {
        this.resultInfo = resultInfo;
    }

    public Map<String, Object> getResultParm() {
        return resultParm;
    }

    public void setResultParm(Map<String, Object> resultParm) {
        this.resultParm = resultParm;
    }
}
