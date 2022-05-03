import { Request, Response } from "express";
import { generate } from "shortid";
import { isUri } from "valid-url";
import Url from "../models/url.model";

export const get = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({ urlId: req.params.id });
    if (url) {
      url.clicks++;
      url.save();
      res.status(200).send({ message: url.originalUrl });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { originalUrl, name } = req.body;

    if (!isUri(originalUrl)) {
      res.status(401).json({ message: "Invalid Url" });
      return;
    }

    const url = await Url.findOne({
      originalUrl,
    });

    if (url) {
      res.status(301).json({ url: originalUrl, message: "Previous url found" });
    } else {
      const id = name ? name : generate();
      const newUrl = new Url({
        urlId: id,
        originalUrl: originalUrl,
      });

      await newUrl.save();
      res.status(200).json({ url: id, message: "Url created successfully" });
    }
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
