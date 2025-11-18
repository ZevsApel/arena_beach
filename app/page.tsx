import BigImage from "./components/BigImage/BigImage";
import FAQ from "./components/FAQ/FAQ";
import Infrastructure from "./components/Infrastructure/Infrastructure";
import Rooms from "./components/Rooms/Rooms";
import BookingForm from "./components/SearchPanel/SearchPanel";
import SliderBlock from "./components/SliderBlock/SliderBlock";
import Slogan from "./components/Slogan/Slogan";
import WelcomeDesc from "./components/WelcomeDesc/WelcomeDesc";

export default function Home() {

  

  return (
    <>
      <Slogan />
      <BookingForm />
      <BigImage />
      <WelcomeDesc />
      <Rooms />
      <Infrastructure />

      <SliderBlock />   
      <FAQ />
    </>
  );
}
