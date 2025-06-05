import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
    console.log("user is created", { body: req.body });
    res.status(200).json({ message: "User created" });

} 