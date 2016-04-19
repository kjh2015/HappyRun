package com.kjh.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/10.
 */
@Component
@Data
public class ResultMessage {
    private Boolean serviceResult;
    private String resultInfo;
    private Map<String, Object> resultParm;
}
