package com.example.gradlewebtest2;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {

  @Override
  protected void doPost(
    HttpServletRequest request,
    HttpServletResponse response
  )
    throws IOException {
    response.setContentType("text/html;charset=UTF-8");
    try (PrintWriter out = response.getWriter()) {
      int num = Integer.parseInt(request.getParameter("numero"));
      int fib = fibonacci(num);
      System.out.println(fib);
      out.println("<h1>" + fib + "</h1>");
    }
  }

  public int fibonacci(int n) {
    if (n == 0 || n == 1) return 1; else return (
      fibonacci(n - 1) + fibonacci(n - 2)
    );
  }
}
