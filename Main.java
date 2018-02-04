import java.io.*;
import java.math.*;
import java.util.*;
 
public class Main {
        FastScanner in;
        PrintWriter out;
 
  class Fraction {
    BigInteger a;
    BigInteger b;

    Fraction(BigInteger aa, BigInteger bb) {
      a = aa;
      b = bb;
    }

    Fraction(int x) {
      a = BigInteger.valueOf(x);
      b = BigInteger.ONE;
    }

    Fraction(int x, int y) {
      a = BigInteger.valueOf(x);
      b = BigInteger.valueOf(y);
    }
  }

  Fraction mul(Fraction a, Fraction b) {
    return new Fraction(a.a.multiply(b.a), a.b.multiply(b.b));
  }

  Fraction div(Fraction a, Fraction b) {
    Fraction c = new Fraction(a.a.multiply(b.b), a.b.multiply(b.a));
    if (c.b.compareTo(BigInteger.ZERO) < 0) {
      c.a = c.a.negate();
      c.b = c.b.negate();
    }
    return c;
  }

  Fraction inverse(int x) {
    if (x < 0) {
      return new Fraction(-1, -x);
    }
    return new Fraction(1, x);
  }

  Fraction add(Fraction a, Fraction b) {
    return new Fraction(a.a.multiply(b.b).add(a.b.multiply(b.a)), a.b.multiply(b.b));
  }

  Fraction sub(Fraction a, Fraction b) {
    return new Fraction(a.a.multiply(b.b).subtract(a.b.multiply(b.a)), a.b.multiply(b.b));
  }

  int compare(Fraction a, Fraction b) {
    return a.a.multiply(b.b).compareTo(b.a.multiply(a.b));
  }

  void solve() {
    int tt = in.nextInt();
    for (int qq = 1; qq <= tt; qq++) {
      out.print("Case #" + qq + ": ");
      int foo = in.nextInt();
      int n = in.nextInt();
      Fraction start = new Fraction(foo);
      int pve = 0, nve = 0;
      List<Integer> mul_neg = new ArrayList<>();
      List<Integer> div_neg = new ArrayList<>();
      Fraction mul_pos = new Fraction(1);
      Fraction div_pos = new Fraction(1);
      boolean zero = false;
      for (int i = 0; i < n; i++) {
        char type = in.next().charAt(0);
        int val = in.nextInt();
        if (type == '+') {
          if (val > 0) {
            pve += val;
          } else {
            nve += val;
          }
        }
        if (type == '-') {
          if (val > 0) {
            nve += -val;
          } else {
            pve += -val;
          }
        }
        if (type == '*') {
          start = mul(start, new Fraction(val));
          if (val == 0) {
            zero = true;
          }
          if (val > 0) {
            mul_pos = mul(mul_pos, new Fraction(val));
          }
          if (val < 0) {
            mul_neg.add(val);
          }
        }
        if (type == '/') {
          start = mul(start, inverse(val));
          if (val > 0) {
            div_pos = mul(div_pos, inverse(val));
          }
          if (val < 0) {
            div_neg.add(val);
          }
        }
      }
      Collections.sort(mul_neg);
      Collections.sort(div_neg);
      List<Fraction> all = new ArrayList<>();
      all.add(mul_pos);
      all.add(div_pos);
      if (zero) {
        all.add(new Fraction(0));
      }
      if (mul_neg.size() < 3) {
        for (int z : mul_neg) {
          all.add(new Fraction(z));
        }
      } else {
        int cnt = mul_neg.size();
        all.add(new Fraction(mul_neg.get(0)));
        all.add(new Fraction(mul_neg.get(cnt - 1)));
        Fraction z = new Fraction(1);
        for (int i = 1; i < cnt - 1; i++) {
          z = mul(z, new Fraction(mul_neg.get(i)));
        }
        all.add(z);
      }
      if (div_neg.size() < 3) {
        for (int z : div_neg) {
          all.add(inverse(z));
        }
      } else {
        int cnt = div_neg.size();
        all.add(inverse(div_neg.get(0)));
        all.add(inverse(div_neg.get(cnt - 1)));
        Fraction z = new Fraction(1);
        for (int i = 1; i < cnt - 1; i++) {
          z = mul(z, inverse(div_neg.get(i)));
        }
        all.add(z);
      }
      int allsz = all.size();
      int p3 = 1;
      for (int i = 0; i < allsz; i++) {
        p3 = p3 * 3;
      }
      Fraction best = null;
      for (int rot = 0; rot < 2; rot++) {
        for (int t = 0; t < p3; t++) {
          Fraction xx = new Fraction(rot == 0 ? pve : nve);
          Fraction yy = new Fraction(rot == 0 ? nve : pve);
          int tmp = t;
          for (int i = 0; i < allsz; i++) {
            int rm = tmp % 3;
            if (rm == 0) {
              xx = mul(xx, all.get(i));
            }
            if (rm == 1) {
              xx = mul(xx, all.get(i));
              yy = mul(yy, all.get(i));
            }
            tmp /= 3;
          }
          Fraction cur = add(xx, yy);
          if (best == null || compare(cur, best) == 1) {
            best = cur;
          }
        }
      }
      best = add(best, start);
      BigInteger g = best.a.abs().gcd(best.b);
      best.a = best.a.divide(g);
      best.b = best.b.divide(g);
      out.println(best.a + " " + best.b);
      System.err.println("test " + qq);
    }
  }
 
        void run() {
                try {
                        in = new FastScanner(new File("in"));
                        out = new PrintWriter(new File("iut"));
 
                        solve();
 
                        out.close();
                } catch (FileNotFoundException e) {
                        e.printStackTrace();
                }
        }
 
        void runIO() {
 
                in = new FastScanner(System.in);
                out = new PrintWriter(System.out);
 
                solve();
 
                out.close();
        }
 
        class FastScanner {
                BufferedReader br;
                StringTokenizer st;
 
                public FastScanner(File f) {
                        try {
                                br = new BufferedReader(new FileReader(f));
                        } catch (FileNotFoundException e) {
                                e.printStackTrace();
                        }
                }
 
                public FastScanner(InputStream f) {
                        br = new BufferedReader(new InputStreamReader(f));
                }
 
                String next() {
                        while (st == null || !st.hasMoreTokens()) {
                                String s = null;
                                try {
                                        s = br.readLine();
                                } catch (IOException e) {
                                        e.printStackTrace();
                                }
                                if (s == null)
                                        return null;
                                st = new StringTokenizer(s);
                        }
                        return st.nextToken();
                }
 
                boolean hasMoreTokens() {
                        while (st == null || !st.hasMoreTokens()) {
                                String s = null;
                                try {
                                        s = br.readLine();
                                } catch (IOException e) {
                                        e.printStackTrace();
                                }
                                if (s == null)
                                        return false;
                                st = new StringTokenizer(s);
                        }
                        return true;
                }
 
                int nextInt() {
                        return Integer.parseInt(next());
                }
 
                long nextLong() {
                        return Long.parseLong(next());
                }

		double nextDouble() {
			return Double.parseDouble(next());
		}
        }
 
        public static void main(String[] args) {
                new Main().run();
        }
}
