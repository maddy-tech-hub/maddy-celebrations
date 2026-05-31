import headerLogo from "../assets/Irasah Logo/header-logo.png";
import tabLogo from "../assets/Irasah Logo/tab-logo.png";
import anniversary from "../assets/Latest Carousel/ANniversary.png";
import candleLightDinner from "../assets/Latest Carousel/CandleLightDInner.png";
import candleLightDinnerAlt from "../assets/Latest Carousel/candle_light_dinner2A.png";
import candleLightDinnerDetail from "../assets/Latest Carousel/candle_light_dinner2AA.png";
import houseWarming from "../assets/Latest Carousel/HouseWarming.png";
import houseWarmingDetail from "../assets/Latest Carousel/house_warming2AA.png";
import kidsArt from "../assets/Latest Carousel/KIdsArt.png";
import roomDecoration from "../assets/Latest Carousel/partyone_room2AA.png";
import welcomeBaby from "../assets/Latest Carousel/partyone_welcome_baby2AA.png";
import sameDay from "../assets/Latest Carousel/SameDay.png";

export const appImages = {
  brand: {
    headerLogo,
    tabLogo,
  },
  carousel: {
    roomDecoration,
    sameDay,
    anniversary,
    welcomeBaby,
    kidsArt,
    houseWarming,
    candleLightDinner,
    candleLightDinnerAlt,
    candleLightDinnerDetail,
    houseWarmingDetail,
  },
  services: {
    ringBalloon: "/ring-baloon.png",
    happyBirthdayNeon: "/happy-birthday-neon.png",
    surpriseBirthdayPlan: "/Surprise-birthday-plan.png",
    uShapeBalloon: "/U-shape-baloon-decoration.png",
    bedroomSurprise: "/Bed-room-surprise.png",
    basicWallDecoration: "/Basic-wall-decoration.png",
    tattooArtist: "/Tattoo.png",
    balloonModeling: "/Ballons.png",
    keyChainMaking: "/key-chain-making.png",
    slimeArt: "/slime-art.png",
    facePainting: "/face-painting.png",
  },
} as const;

export type ServiceImageKey = keyof typeof appImages.services;

export const fallbackServiceImage = appImages.services.ringBalloon;
