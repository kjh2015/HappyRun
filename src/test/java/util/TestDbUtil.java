package util;

import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.DatabaseSequenceFilter;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.FilteredDataSet;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.ext.mysql.MySqlDataTypeFactory;
import org.dbunit.operation.DatabaseOperation;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;

/**
 * Created by Administrator on 2016/3/22.
 */
public class TestDbUtil {
    /**
     * 数据库连接驱动.
     */
    private static final String DRIVER = "com.mysql.jdbc.Driver";

    /**
     * 数据库连接地址，指向所访问的数据库.
     */
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/test?"
            + "zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=utf-8";

    /**
     * 数据库访问用户名.
     */
    private static final String USER = "root";

    /**
     * 数据库访问密码.
     */
    private static final String PASSWORD = "root";

    /**
     * 数据库连接对象名称.
     */
    private static Connection conn = null;

    /**
     * 数据库连接对象名称.
     */
    private static IDatabaseConnection connection = null;

    /**
     * 实例化数据库连接对象.
     */
    static {
        try {
            Class.forName(DRIVER);
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            // 实例化dbunit的数据库连接对象
            connection = new DatabaseConnection(conn);
            connection.getConfig().setProperty(
                    DatabaseConfig.PROPERTY_DATATYPE_FACTORY,
                    new MySqlDataTypeFactory());
            connection.getConnection()
                    .prepareStatement("set @@session.foreign_key_checks = 0")
                    .execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 数据库操作工具类的私有构造方法，其作用是为了防止用户显式生成工具类的实例对象.
     *
     */
    private TestDbUtil() {
    }

    /**
     * 获取数据库连接器.
     *
     * @return the conn
     */
    public static IDatabaseConnection getConn() {
        return connection;
    }

    /**
     * 备份当前数据库.
     *
     * @return 原数据库信息
     * @throws Exception
     *             普通异常
     */
    public static IDataSet backupDataBase() throws Exception {
        System.out.println(connection);
        // 以下两行获取当前数据库，但不包含数据，只包含引用
        IDataSet backupDataset = new FilteredDataSet(
                new DatabaseSequenceFilter(connection),
                connection.createDataSet());
        // 实例化数据库备份的文件
        // 通过数据库引用将当前数据库中的数据备份到文件中
        FileOutputStream fileOutputStream = new FileOutputStream(new File(
                "testBackupDatabase.xml"));
        FlatXmlDataSet.write(backupDataset, fileOutputStream);
        fileOutputStream.close();
        return backupDataset;
    }

    /**
     * 还原数据库.
     *
     * @throws Exception
     *             普通异常
     */
    public static void restoreDataBase() throws Exception {
        // 首先从文件读取原数据库
        File file = new File("./testBackupDatabase.xml");
        FlatXmlDataSetBuilder flatXmlDataSetBuilder = new FlatXmlDataSetBuilder();
        flatXmlDataSetBuilder.setDtdMetadata(false);
        flatXmlDataSetBuilder.setColumnSensing(true);
        IDataSet backUpDataset = flatXmlDataSetBuilder.build(file);
        // 将原数据导入数据库
        //InsertIdentityOperation.REFRESH.execute(connection, backUpDataset);
        DatabaseOperation.CLEAN_INSERT.execute(connection, backUpDataset);
        // 删除备份文件
        file.delete();
    }

    /**
     * 执行会修改数据库的操作的方法.
     *
     * @param sql
     *            待执行的sql语句
     */
    public static void executeUpdate(final String sql) {
        try {
            if (sql == null || "".equals(sql)) {
                throw new NullPointerException("sql为空");
            }

            PreparedStatement statement = conn.prepareStatement(sql);
            statement.executeUpdate();
        } catch (NullPointerException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * 执行数据库查询的方法.
     *
     * @param sql
     *            待执行的sql语句
     * @return 本次查询所返回的结果.
     */
    public static ResultSet executeQuery(final String sql) {
        ResultSet rs = null;
        try {
            if (sql == null || "".equals(sql)) {
                throw new NullPointerException("sql为空");
            }

            PreparedStatement statement = conn.prepareStatement(sql);
            rs = statement.executeQuery(sql);
        } catch (NullPointerException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;
    }
}
