package com.kjh.domain;

import lombok.Data;

import java.util.List;

/**
 * Created by Administrator on 2016/4/18.
 */
@Data
public class Pagination {
    private int startPage;
    private int pageSize;
    private int totalCount;
    private List pageList;
}
