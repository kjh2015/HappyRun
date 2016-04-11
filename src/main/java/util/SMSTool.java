/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
package util;


import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

/**
 * 短信发送操作工具类.
 */
public final class SMSTool {
    /**
     * log4j实例对象.
     */
    private static Logger logger = LogManager.getLogger(SMSTool.class);

    /**
     * 单例对象.
     */
    private static SMSTool instance = new SMSTool();

    /**
     * 短信平台账号.
     */
    private static final String USERNAME = "houjx114";

    /**
     * 短信平台密码.
     */
    private static final String PASSWORD = "2A2CA86B1569073F89EB5C0DF26616A6";

    /**
     * 短信平台密码错误.
     */
    private static final int PASSWORD_ERROR = 30;

    /**
     * 短信平台账号不存在.
     */
    private static final int ACCOUNT_NOT_EXIST = 40;

    /**
     * 短信平台余额不足.
     */
    private static final int LACK_BALANCE = 41;

    /**
     * 短信平台帐号过期.
     */
    private static final int ACCOUNT_EXPIRED = 42;

    /**
     * 短信平台IP地址限制.
     */
    private static final int IP_ADDRESS_RESTRICTIONS = 43;

    /**
     * 短信内容含有敏感词.
     */
    private static final int WORDS_CONTAINING_SENSITIVE_CONTENT = 50;

    /**
     * 手机号码不正确.
     */
    private static final int MOBILE_NUMBER_IS_INCORRECT = 51;

    /**
     * 单例模式的私有构造方法.
     */
    private SMSTool() {
    }

    /**
     * 获取单例.
     * 
     * @return 单例
     */
    public static SMSTool getInstance() {
        return instance;
    }

    /**
     * 发送短信到指定手机上.
     * 
     * @param mobileNum
     *            需要发送的手机号码
     * @param content
     *            需要发送的短信内容
     */
    public static void sendSMS(final String mobileNum, final String content) {
        logger.debug("进入sendSMS方法");
        logger.debug("mobileNum:" + mobileNum + ",content:" + content);
        String url = "http://api.smsbao.com/sms?u=" + USERNAME + "&p="
                + PASSWORD + "&m=" + mobileNum + "&c=" + content;

        try {
           String temp = HttpTool.requestByGet(url);
            int result = Integer.valueOf(temp);

            if (result == ACCOUNT_NOT_EXIST) {
                throw new Exception("短信平台账号不存在");
            } else if (result == PASSWORD_ERROR) {
                throw new Exception("短信平台密码错误");
            } else if (result == LACK_BALANCE) {
                throw new Exception("短信平台余额不足");
            } else if (result == ACCOUNT_EXPIRED) {
                throw new Exception("短信平台帐号过期");
            } else if (result == IP_ADDRESS_RESTRICTIONS) {
                throw new Exception("短信平台IP地址限制");
            } else if (result == WORDS_CONTAINING_SENSITIVE_CONTENT) {
                throw new Exception("短信内容含有敏感词");
            } else if (result == MOBILE_NUMBER_IS_INCORRECT) {
                throw new Exception("手机号码不正确");
            }
        } catch (Exception e) {
            logger.error("Exception:", e);
            e.printStackTrace();
        }
        logger.debug("退出sendSMS方法");
    }
}
