package user;

import com.kjh.domain.user.User;
import com.kjh.service.user.UserService;
import com.kjh.service.user.impl.UserServiceImpl;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/3/20.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class Demo {
        private static Logger log = Logger.getLogger(Demo.class);
      @Resource(name = "userService")
        private UserService userService = null;

        @Test
        public void test1() {
            log.info("进入test1");
            System.out.print(userService);
            User user = userService.getUserById(1);
            System.out.println(user);
        }

}
