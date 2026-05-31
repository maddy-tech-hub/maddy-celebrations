import type { Service } from "../types";
import { appImages, type ServiceImageKey } from "./images";
import servicesConfig from "./services.json";

type ServiceConfig = Omit<Service, "image" | "gallery"> & {
  imageKey: ServiceImageKey;
  galleryImageKeys?: ServiceImageKey[];
};

const resolveServiceImage = (key: ServiceImageKey) => appImages.services[key];

export const services: Service[] = (servicesConfig as ServiceConfig[]).map(({ imageKey, galleryImageKeys, ...service }) => ({
  ...service,
  image: resolveServiceImage(imageKey),
  gallery: (galleryImageKeys?.length ? galleryImageKeys : [imageKey]).map(resolveServiceImage),
}));
