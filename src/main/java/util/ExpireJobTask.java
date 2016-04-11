package util;

import org.apache.log4j.Logger;

/**
 * Created by Administrator on 2016/3/29.
 */
public class ExpireJobTask {
    private static final Logger logger = Logger.getLogger(ExpireJobTask.class);

    /**
     * 业务逻辑处理
     */
    public void doBiz() {
        logger.info("进入定时任务");
//        SMSTool.sendSMS("15521315548","测试定时任务成功，恭喜你");
//        System.out.println("成功了");
//        logger.info("哈哈");
//        logger.info("现在的时间是:" + new Date());
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd HH:MM:SS");
//        Date currentDate = new Date();
//        String showDate = format.format(currentDate);
//        System.out.println("现在时间是"+showDate);
        try {
            EmailUtil.createImageMail();
        } catch (Exception e) {
            e.printStackTrace();
        }
        logger.info("退出定时任务");
    }
}
