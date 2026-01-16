import java.util.Scanner;

public class ElectricityBillCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // รับค่าหน่วยการใช้ไฟฟ้า (kWh)
        System.out.print("Enter electricity usage (kWh): ");
        int units = scanner.nextInt();

        double rate;
        double energyCharge;
        double serviceCharge = 50.0;

        // เลือกอัตราค่าไฟฟ้าตามช่วงหน่วย
        if (units <= 150) {
            rate = 3.50;
        } else if (units <= 400) {
            rate = 4.20;
        } else {
            rate = 5.00;
        }

        // คำนวณค่าใช้ไฟ (ไม่รวมค่าบริการ)
        energyCharge = units * rate;

        // รวมค่าบริการ
        double totalBill = energyCharge + serviceCharge;

        // แสดงผล
        System.out.println("Units used      : " + units + " kWh");
        System.out.println("Rate per unit   : " + rate + " Baht/unit");
        System.out.println("Energy charge   : " + energyCharge + " Baht");
        System.out.println("Service charge  : " + serviceCharge + " Baht");
        System.out.println("Total bill      : " + totalBill + " Baht");

        scanner.close();
    }
}