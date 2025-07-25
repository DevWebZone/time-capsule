
import "./globals.css";
import UserContext from "../helpers/Context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >  
          <UserContext>
            {children}
          </UserContext>
      </body>
    </html>
  );
}