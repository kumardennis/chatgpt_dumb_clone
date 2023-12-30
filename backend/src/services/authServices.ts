import { Request, Response } from 'express';

export const handleAuthentication = (req: Request, res: Response) => {
  res.send(`
  <html>
  <body>
      <script>
          window.close(); // Close the popup window
      </script>
  </body>
</html>
  `);
};
