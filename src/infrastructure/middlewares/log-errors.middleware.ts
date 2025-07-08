import { NextFunction, Request, Response } from "express";

export const logErrorsMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof err === "object" && err !== null && "message" in err) {
    console.warn("🛑 Error detectado:");
    console.warn("→", (err as any).message);

    res.status(500).json({ error: err.message });

    return;
  }

  res.status(500).json({ error: "Internal server error" });
};
