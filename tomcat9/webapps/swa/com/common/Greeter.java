package com.common;

import java.util.Date;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Greeter extends HttpServlet {
    public Greeter() { super(); };

    private String getGreeting() {
        Date date = new Date();
        return "I am saying hi at: " + date.toString();
    };

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            OutputStream out = response.getOutputStream();
            response.setContentType("text/html");
            String greet = "<h1>" + getGreeting() + "</h1>";
            out.write(greet.getBytes());
        } catch(IOException e) {
            e.printStackTrace();
        }
    };
}