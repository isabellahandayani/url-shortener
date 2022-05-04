import { Request, Response } from "express";
import { generate } from "shortid";
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

    const previousName = await Url.findOne({
      urlId: name
    });

    console.log(previousName)

    if (previousName) {
      res.status(301).json({ url: originalUrl, message: "Previous name found" });
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

export const validate = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const previousId = await Url.findOne({ urlId: name });

    if (previousId) {
      res.status(404).json({ url: name, message: "Previous name found" });
    } else {
      res.status(200).json({ message: "Not Found" });
    }
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
