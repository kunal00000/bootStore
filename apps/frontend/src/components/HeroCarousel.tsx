import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Button, Card, Grid, Image, Text, Title } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function HeroCarousel() {
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 2500 }));

  const { ref, inView } = useInView({});
  const { ref: ref2, inView: inView2 } = useInView({});
  const { ref: ref3, inView: inView3 } = useInView({});

  return (
    <Carousel
      withIndicators
      loop
      plugins={[autoplay.current]}
      draggable={false}
      withControls={false}
      styles={{
        indicator: {
          width: "1vw",
          height: "1vw",
          border: "0.1rem solid #000",
          transition: "width 250ms ease",

          "&[data-active]": {
            width: "2.5vw"
          }
        }
      }}
    >
      <Carousel.Slide>
        <Grid columns={12}>
          <Grid.Col ref={ref} span={"content"} offset={1} className="relative">
            <Card
              className={`absolute xs:top-[5vw] md:top-32 z-10 ${
                inView ? "animate-in-2" : ""
              } bg-transparent`}
            >
              <Text className="xs:text-xs xs:my-1 md:text-3xl md:my-4 font-bold text-green-600 tracking-wider">
                Healthy Vegetables
              </Text>
              <div className="xs:hidden md:flex md:w-32 border-2 rounded-full border-green-600" />
              <Card.Section
                mx={"auto"}
                className="xs:my-1 md:my-4 md:text-5xl font-extrabold tracking-wider"
              >
                <strong>PERFECT</strong>
                <strong className="text-white bg-green-600 px-2 font-outline">
                  BREAKFAST
                </strong>
              </Card.Section>
              <Card.Section mx={"auto"}>
                <Title className="xs:hidden md:inline my-4 text-3xl font-extrabold">
                  BEST WEEKLY PRICES
                </Title>
              </Card.Section>
              <Card.Section
                mx={"auto"}
                className="xs:my-2 xs:text-[0.1rem] md:my-6 "
              >
                <Button
                  rightIcon={<IconShoppingBag size={20} />}
                  color="green"
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Shop now
                </Button>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Image
            src="https://maraviyainfotech.com/projects/ekka/ekka-v35/ekka-html/assets/images/main-slider-banner/29.jpg"
            mx={"auto"}
          />
        </Grid>
      </Carousel.Slide>
      <Carousel.Slide>
        <Grid columns={12}>
          <Grid.Col ref={ref2} span={"content"} offset={1}>
            <Card
              className={`absolute xs:top-[5vw] md:top-32 z-10 ${
                inView2 ? "animate-in-2" : ""
              } bg-transparent`}
            >
              <Text className="xs:text-xs xs:my-1 md:text-3xl md:my-4 font-bold text-green-600 tracking-wider">
                Healthy Fruits
              </Text>
              <div className="xs:hidden md:flex md:w-32 border-2 rounded-full border-green-600" />
              <Card.Section
                mx={"auto"}
                className="xs:my-1 md:my-4 md:text-5xl font-extrabold tracking-wider"
              >
                <strong>HEALTHY </strong>
                <strong className="text-white bg-green-600 px-2 font-outline">
                  ORGANIC
                </strong>
              </Card.Section>
              <Card.Section mx={"auto"}>
                <Title className="xs:hidden md:inline my-4 text-3xl font-extrabold">
                  FOOD EVERYDAY
                </Title>
              </Card.Section>
              <Card.Section
                mx={"auto"}
                className="xs:my-2 xs:text-[0.1rem] md:my-6 "
              >
                <Button
                  rightIcon={<IconShoppingBag size={20} />}
                  color="green"
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Shop now
                </Button>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Image
            src="https://maraviyainfotech.com/projects/ekka/ekka-v35/ekka-html/assets/images/main-slider-banner/30.jpg"
            mx={"auto"}
          />
        </Grid>
      </Carousel.Slide>
      <Carousel.Slide>
        <Grid columns={12}>
          <Grid.Col ref={ref3} span={"content"} offset={1}>
            <Card
              className={`absolute xs:top-[5vw] md:top-32 z-10 ${
                inView3 ? "animate-in-2" : ""
              } bg-transparent`}
            >
              <Text className="xs:text-xs xs:my-1 md:text-3xl md:my-4 font-bold text-green-600 tracking-wider">
                All You Need
              </Text>
              <div className="xs:hidden md:flex md:w-32 border-2 rounded-full border-green-600" />
              <Card.Section
                mx={"auto"}
                className="xs:my-1 md:my-4 md:text-5xl font-extrabold tracking-wider"
              >
                <strong>FRESH </strong>
                <strong className="text-white bg-green-600 px-2 font-outline">
                  GROCERY
                </strong>
              </Card.Section>
              <Card.Section mx={"auto"}>
                <Title className="xs:hidden md:inline my-4 text-3xl font-extrabold">
                  DESERVER TO EAT FRESH
                </Title>
              </Card.Section>
              <Card.Section
                mx={"auto"}
                className="xs:my-2 xs:text-[0.1rem] md:my-6 "
              >
                <Button
                  rightIcon={<IconShoppingBag size={20} />}
                  color="green"
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Shop now
                </Button>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Image
            src="https://maraviyainfotech.com/projects/ekka/ekka-v35/ekka-html/assets/images/main-slider-banner/31.jpg"
            mx={"auto"}
          />
        </Grid>
      </Carousel.Slide>
    </Carousel>
  );
}
export default HeroCarousel;
