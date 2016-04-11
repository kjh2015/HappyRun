/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
package util;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

/**
 * http访问操作工具类.
 */
public final class HttpTool {
    /**
     * log4j实例对象.
     */
    private static Logger logger = LogManager.getLogger(HttpTool.class);

    /**
     * 单例对象.
     */
    private static HttpTool instance = new HttpTool();

    /**
     * http客户端.
     */
    private static CloseableHttpClient client = HttpClientBuilder.create()
            .build();

    /**
     * 单例模式的私有构造方法.
     */
    private HttpTool() {
    }

    /**
     * 获取单例.
     * 
     * @return 单例
     */
    public static HttpTool getInstance() {
        return instance;
    }

    /**
     * 使用get方式来访问传入的url，并返回服务器反馈到的信息.
     * 
     * @param url
     *            需要访问的url
     * @return 服务器反馈信息.
     * @throws Exception
     *             普通异常.
     */
    public static String requestByGet(final String url) throws Exception {
        logger.debug("进入requestByGet方法");
        logger.debug("url:" + url);
        String response = null;
        try {
            HttpGet httpget = new HttpGet(url);
            response = client.execute(httpget, new BasicResponseHandler());
        } catch (Exception e) {
            if (url == null) {
                logger.error("url空指针");
            }
            logger.error("Exception:", e);
            e.printStackTrace();
            throw new Exception(e);
        }
        logger.debug("退出requestByGet方法");
        return response;
    }
}
