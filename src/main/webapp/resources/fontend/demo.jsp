<%@ page language="java" pageEncoding="UTF-8"%>
<form action="<%=request.getContextPath()%>/upload/uploadFile.do" method="post" enctype="multipart/form-data">
    username: <input type="text" name="username"/><br/>
    nickname: <input type="text" name="nickname"/><br/>
    password: <input type="password" name="password"/><br/>
    yourmail: <input type="text" name="email"/><br/>
    yourfile: <input type="file" name="file"/><br/>
    <input type="submit" value="提交"/>
</form>