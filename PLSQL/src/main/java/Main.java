import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {

    public static void main(String[] args) throws IOException {
        ServerSocket coadaConexiuni = new ServerSocket(8011);              //adaug un listener la portul 8011 serverului                                         
        try {
            while (true) {                                                 // cat timp serverul este pornit
                Socket socluConexiune = coadaConexiuni.accept();             // accept o noua conexiune
                BufferedReader cititor = new BufferedReader(new InputStreamReader(socluConexiune.getInputStream()));    // citesc mesajul trimis de client
                try {
                    PrintWriter outputPrinter = new PrintWriter(socluConexiune.getOutputStream(), true);                     

                    String inputLine = cititor.readLine();                            // citesc prima linie din mesajul trimis de client
                    if (null != inputLine) {                                          // daca mesajul nu este nul
                        outputPrinter.println("Ai primit rezultatul: " + inputLine);        // procesez cererea si salvez rezultatul la capatul de scriere
                    }
                    outputPrinter.flush();                         // trimit toata informatia
                    outputPrinter.close();                         // inchid capatul de scriere
                } finally {
                    socluConexiune.close();
                }
            }
        } finally {
            coadaConexiuni.close();
        }
    }
}
