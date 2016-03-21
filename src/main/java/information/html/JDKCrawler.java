package information.html;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by Administrator on 2016/3/19.
 */
public class JDKCrawler {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://www.sina.com.cn");
            URLConnection connection = url.openConnection();
            connection.connect();
            InputStream inputStream = connection.getInputStream();
            BufferedReader bs = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder sb = new StringBuilder();
            while (bs.readLine()!=null){
                sb.append(bs.readLine());
//                System.out.print(bs.readLine());
            }
            System.out.print(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
