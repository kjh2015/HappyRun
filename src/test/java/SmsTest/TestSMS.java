package SmsTest;

import util.SMSTool;

/**
 * Created by Administrator on 2016/3/23.
 */
public class TestSMS {
    public static void main(String[] args) {
        SMSTool smsTool = SMSTool.getInstance();
        smsTool.sendSMS("15521315548","尊敬的***，撒比，欢迎注册乐跑，验证码:205412");
    }
}
