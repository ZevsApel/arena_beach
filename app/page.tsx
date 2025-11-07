import BigImage from "./components/BigImage/BigImage";
import Rooms from "./components/Rooms/Rooms";
import BookingForm from "./components/SearchPanel/SearchPanel";
import Slogan from "./components/Slogan/Slogan";
import WelcomeDesc from "./components/WelcomeDesc/WelcomeDesc";

export default function Home() {
  return (
    <>
      <Slogan></Slogan>
      <BookingForm></BookingForm>
      <BigImage></BigImage>
      <WelcomeDesc></WelcomeDesc>
      <Rooms></Rooms>
    </>
  );
}
