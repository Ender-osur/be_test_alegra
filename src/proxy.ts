import { Request, Response, Express } from "express";
import axios from "axios";

const ALEGRA_API_URL = "https://api.alegra.com/api/v1";
const TOKEN_ALEGRA_BASE64 = process.env.TOKEN_ALEGRA_BASE64 || "";

export function setupProxy(app: Express) {
  app.all("/api/alegra/*", async (req: Request, res: Response) => {
    try {
      const alegraPath = req.params[0];

      const response = await axios({
        method: req.method,
        url: `${ALEGRA_API_URL}/${alegraPath}`,
        headers: {
          Authorization: `Basic ${TOKEN_ALEGRA_BASE64}`,
          "Content-Type": "application/json",
        },
        data: req.body,
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: "Error en el proxy" });
    }
  });
}
