import { Router } from "express";
import { getShortenURLController } from "./useCases/GetShortenURL";
import { shortenURLController } from "./useCases/ShortenURL";

const route = Router();

route.post("/encurtador", (request, response) => {
    return shortenURLController.handle(request, response);
});

route.get("/:id", (request, response) => {
    return getShortenURLController.handle(request, response);
});

export { route }