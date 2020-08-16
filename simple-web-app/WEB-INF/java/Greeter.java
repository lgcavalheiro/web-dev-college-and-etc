import java.util.Date;

public class Greeter {
    public Greeter() { };
    public String getGreeting() {
        Date date = new Date();
        return "I am saying hi at: " + date.toString();
    };
}