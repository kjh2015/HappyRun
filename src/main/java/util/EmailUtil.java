package util;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.FileOutputStream;
import java.util.Properties;

/**
 * Created by Administrator on 2016/4/10.
 */
public class EmailUtil {
    private static Session session;

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    private EmailUtil() {
    }

    /**
     * 创建session方法.
     *
     * @return session.
     */
    public static Session createSession() {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.qq.com");
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.smtp.auth", "true");
//        MailSSLSocketFactory sf = new MailSSLSocketFactory();
//        sf.setTrustAllHosts(true);
        prop.put("mail.smtp.ssl.enable", "true");
//        prop.put("mail.smtp.ssl.socketFactory", sf);

//        prop.setProperty("charset","utf-8");
        //使用JavaMail发送邮件的5个步骤
        //1、创建session
        session = Session.getInstance(prop);
        //开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
        session.setDebug(true);
        return session;
    }

    /**
     * 发送一封简单的邮件.
     *
     * @throws Exception
     */
    public static void createSimpleMail()
            throws Exception {
        session = createSession();
        //2、通过session得到transport对象
        Transport ts = null;
        try {
            ts = session.getTransport();
            //3、使用邮箱的用户名和密码连上邮件服务器，发送邮件时，发件人需要提交邮箱的用户名和密码给smtp服务器，用户名和密码都通过验证之后才能够正常发送邮件给收件人。
            ts.connect("smtp.qq.com", "811036514@qq.com", "fawwhgqqurnubbci");
            //4、创建邮件
            //创建邮件对象
            MimeMessage message = new MimeMessage(session);
            //指明邮件的发件人
            message.setFrom(new InternetAddress("811036514@qq.com"));
            //指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
            message.setRecipient(Message.RecipientType.TO, new InternetAddress("kangjiahao2015@163.com"));
            //邮件的标题
            message.setSubject("只包含文本的简单邮件");
            //邮件的文本内容
            message.setContent("你好啊！", "text/html;charset=UTF-8");
            //返回创建好的邮件对象
            //5、发送邮件
            ts.sendMessage(message, message.getAllRecipients());
            ts.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送带有图片的邮件.
     *
     * @throws Exception
     */
    public static void createImageMail() throws Exception {
        session = createSession();
        //2、通过session得到transport对象
        Transport ts = null;
        try {
            ts = session.getTransport();
            //3、使用邮箱的用户名和密码连上邮件服务器，发送邮件时，发件人需要提交邮箱的用户名和密码给smtp服务器，用户名和密码都通过验证之后才能够正常发送邮件给收件人。
            ts.connect("smtp.qq.com", "811036514@qq.com", "fawwhgqqurnubbci");
            //4、创建邮件
            //创建邮件对象
            MimeMessage message = new MimeMessage(session);
            message.setSubject("带有图片的邮件");
            //指明邮件的发件人
            message.setFrom(new InternetAddress("811036514@qq.com"));
            //指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
            message.setRecipient(Message.RecipientType.TO, new InternetAddress("951558166@qq.com"));
            // 准备邮件数据
            // 准备邮件正文数据
            MimeBodyPart text = new MimeBodyPart();
            text.setContent("这是一封邮件正文带图片<img src='cid:xxx.jpg'>的邮件", "text/html;charset=UTF-8");
            // 准备图片数据
            MimeBodyPart image = new MimeBodyPart();
            DataHandler dh = new DataHandler(new FileDataSource("E:/1.jpg"));
            image.setDataHandler(dh);
            image.setContentID("xxx.jpg");
            // 描述数据关系
            MimeMultipart mm = new MimeMultipart();
            mm.addBodyPart(text);
            mm.addBodyPart(image);
            mm.setSubType("related");

            message.setContent(mm);
            message.saveChanges();
            //将创建好的邮件写入到E盘以文件的形式进行保存
//            message.writeTo(new FileOutputStream("E:\\ImageMail.eml"));
            //返回创建好的邮件
            //5、发送邮件
            ts.sendMessage(message, message.getAllRecipients());
            ts.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送带有附件的邮件.
     *
     * @throws Exception
     */
    public static void createAttachMail() throws Exception {
        session = createSession();
        //2、通过session得到transport对象
        Transport ts = null;
        try {
            ts = session.getTransport();
            //3、使用邮箱的用户名和密码连上邮件服务器，发送邮件时，发件人需要提交邮箱的用户名和密码给smtp服务器，用户名和密码都通过验证之后才能够正常发送邮件给收件人。
            ts.connect("smtp.qq.com", "811036514@qq.com", "fawwhgqqurnubbci");
            //4、创建邮件
            //创建邮件对象
            MimeMessage message = new MimeMessage(session);
            message.setSubject("发送带有附件的邮件");
            //指明邮件的发件人
            message.setFrom(new InternetAddress("811036514@qq.com"));
            //指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
            message.setRecipient(Message.RecipientType.TO, new InternetAddress("kangjiahao2015@163.com"));
//创建邮件正文，为了避免邮件正文中文乱码问题，需要使用charset=UTF-8指明字符编码
            MimeBodyPart text = new MimeBodyPart();
            text.setContent("使用JavaMail创建的带附件的邮件", "text/html;charset=UTF-8");

            //创建邮件附件
            MimeBodyPart attach = new MimeBodyPart();
            DataHandler dh = new DataHandler(new FileDataSource("E:/1.jpg"));
            attach.setDataHandler(dh);
            attach.setFileName(dh.getName());  //

            //创建容器描述数据关系
            MimeMultipart mp = new MimeMultipart();
            mp.addBodyPart(text);
            mp.addBodyPart(attach);
            mp.setSubType("mixed");

            message.setContent(mp);
            message.saveChanges();
            //5、发送邮件
            ts.sendMessage(message, message.getAllRecipients());
            ts.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
