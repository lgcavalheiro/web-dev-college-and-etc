<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <jsp:useBean id="now" class="Greeter" />

    <%= now %>

    <% 
    
        for(int i = 0; i < 10; i++) {
            String tag = "<h3>Hi hello " + String.valueOf(i) + " ?!</h3>";
            out.println(tag);
        }

    %>

</body>
</html>