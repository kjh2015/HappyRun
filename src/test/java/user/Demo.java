package user;

import com.kjh.domain.user.User;
import com.kjh.service.user.UserService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
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
        public void testQueryById() {
            log.info("进入testQueryById");
            System.out.print(userService);
            User user = userService.getUserById(1);
            System.out.println(user);
        }

    @Test
    public void testInsert() {
        log.info("进入testInsert");
        User userForAdd = new User();
        userForAdd.setUsername("test");
         userService.insertUser(userForAdd);
    }

    @Test
    public void testUpdate() {
        log.info("进入testUpdate");
        User userForUpdate = new User();
        userForUpdate.setUserid(2);
        userForUpdate.setUsername("TestName");
        userService.updateUser(userForUpdate);
    }
    @Test
    public void testDelete() {
        log.info("进入testDelete");
        userService.deleteUser(1);
    }


}
