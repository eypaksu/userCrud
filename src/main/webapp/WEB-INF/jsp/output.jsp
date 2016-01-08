<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
<h2>Here is a simple CRUD using Spring MVC and MongoDB.</h2>
<form action="user/save" method="post">
<input type="hidden" name="id">
<label for="name">User Name</label>
<input type="text" id="name" name="name"/>
<input type="submit" value="Submit"/>
</form>
<table border="1">
<c:forEach var="user" items="${userList}">
<tr>
<td>${user.name}</td><td>
<input type="button" value="delete" onclick="window.location='user/delete?id=${user.id}'"/></td>
</tr>
</c:forEach>
</table>
</body>
</html>
