package user;

import com.kjh.controller.user.UserController;
import org.apache.http.HttpResponse;
import org.dbunit.DatabaseUnitException;
import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.database.QueryDataSet;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.dataset.xml.FlatXmlWriter;
import org.dbunit.ext.mysql.MySqlDataTypeFactory;
import org.dbunit.operation.DatabaseOperation;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import util.TestDbUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.junit.Assert.assertEquals;

/**
 * Created by Administrator on 2016/3/22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/spring-mybatis.xml"})
public class UserControllerTest extends AbstractTransactionalJUnit4SpringContextTests {
    private static  IDatabaseConnection connection = null;
    private static MockHttpServletRequest  mockHttpServletRequest= null;
    private static MockHttpServletResponse  mockHttpServletResponse= null;
    @Autowired
    private   UserController userController;
    @Before
    public void init() {
//        try {
//            Class.forName("com.mysql.jdbc.Driver");
//            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test", "root", "root");
//             connection = new DatabaseConnection(conn);
//            connection.getConfig().setProperty(
//                    DatabaseConfig.PROPERTY_DATATYPE_FACTORY,
//                    new MySqlDataTypeFactory());
//            QueryDataSet queryDataSet = new QueryDataSet(connection);
//            queryDataSet.addTable("t_user");
//            FlatXmlDataSet.write(queryDataSet, new FileOutputStream("testDb.xml"));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setCharacterEncoding("UTF-8");
        mockHttpServletResponse = new MockHttpServletResponse();
    }
    @After
    public void destroy(){
//        File file = new File("testDb.xml");
//        FlatXmlDataSetBuilder flatXmlDataSetBuilder = new FlatXmlDataSetBuilder();
//        flatXmlDataSetBuilder.setDtdMetadata(false);
//        flatXmlDataSetBuilder.setColumnSensing(true);
//        try {
//        IDataSet backUpDataset = flatXmlDataSetBuilder.build(file);
//        // 将原数据导入数据库
//        //InsertIdentityOperation.REFRESH.execute(connection, backUpDataset);
//            DatabaseOperation.CLEAN_INSERT.execute(connection, backUpDataset);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        // 删除备份文件
//        file.delete();
    }

    @Test
    public void test() {
        try {
            System.out.println(userController);
            mockHttpServletRequest.setParameter("userid","1");
//            HttpServletRequest request =mockHttpServletRequest;
//            HttpResponse response = (HttpResponse)mockHttpServletResponse;
            String str = userController.toIndex(mockHttpServletRequest,mockHttpServletResponse);
            assertEquals("index",str);
            System.out.println(str);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
