package com.backend.space_gateway.service;

import com.backend.space_gateway.model.PlanetResponse;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlanetService {

    public List<PlanetResponse> getAllPlanets() {
        List<PlanetResponse> planets = new ArrayList<>();

// Mercury
        PlanetResponse mercury = new PlanetResponse();
        mercury.setId("mercury");
        mercury.setName("Mercury");
        mercury.setDescription("The smallest and innermost planet in the Solar System, with a highly eccentric orbit and almost no atmosphere.");
        mercury.setMass(0.055);
        mercury.setRadius(0.383);
        mercury.setSemiMajorAxis(0.387);
        mercury.setOrbitalPeriod(88);
        mercury.setImageUrl("https://pixabay.com/get/g5a734f92428f1ba467871ba912b1b386bc4a556b39ed66eebb22dd89e08f80cfa67e0e45eda3c8b0d390bf893a8611f821ee8db3dc7f145f27db5f26c63a17c55f2c35fb5f71f257f1bca36890f609cd_640.png");
        mercury.setHasRings(false);
        mercury.setMoonCount(0);
        mercury.setType("terrestrial");
        mercury.setSurfaceGravity(0.38);
        mercury.setSurfaceTemperature(440);
        mercury.setComposition("Iron, Nickel, Silicate");
        planets.add(mercury);

// Venus
        PlanetResponse venus = new PlanetResponse();
        venus.setId("venus");
        venus.setName("Venus");
        venus.setDescription("Second planet from the Sun, known for its thick toxic atmosphere and extreme greenhouse effect making it the hottest planet.");
        venus.setMass(0.815);
        venus.setRadius(0.949);
        venus.setSemiMajorAxis(0.723);
        venus.setOrbitalPeriod(225);
        venus.setImageUrl("https://pixabay.com/get/g284c82da60c405c530680e214c8803d3e53ba185fdd63114cc2bb1d11dbfeaaa1eed143180337a9e490ef44773f60243_1280.jpg");
        venus.setHasRings(false);
        venus.setMoonCount(0);
        venus.setType("terrestrial");
        venus.setSurfaceGravity(0.91);
        venus.setSurfaceTemperature(737);
        venus.setComposition("Carbon dioxide, Nitrogen");
        planets.add(venus);

// Earth
        PlanetResponse earth = new PlanetResponse();
        earth.setId("earth");
        earth.setName("Earth");
        earth.setDescription("Our home planet, the only known celestial body to harbor life with liquid water oceans and an oxygen-rich atmosphere.");
        earth.setMass(1.0);
        earth.setRadius(1.0);
        earth.setSemiMajorAxis(1.0);
        earth.setOrbitalPeriod(365.25);
        earth.setImageUrl("https://pixabay.com/get/g0c3c0a64722da4493ca95a1091ca1d78a94be21056d9a0a685a9edb02aac0af9379074787605eab3a66582867b744eb2c9cabbae6869808a8497e4e49017285e_1280.jpg");
        earth.setHasRings(false);
        earth.setMoonCount(1);
        earth.setType("terrestrial");
        earth.setSurfaceGravity(1.0);
        earth.setSurfaceTemperature(288);
        earth.setComposition("Nitrogen, Oxygen");
        planets.add(earth);

// Mars
        PlanetResponse mars = new PlanetResponse();
        mars.setId("mars");
        mars.setName("Mars");
        mars.setDescription("The Red Planet, with polar ice caps, ancient river valleys, and evidence of past liquid water. A prime target for human exploration.");
        mars.setMass(0.107);
        mars.setRadius(0.532);
        mars.setSemiMajorAxis(1.524);
        mars.setOrbitalPeriod(687);
        mars.setImageUrl("https://pixabay.com/get/g51efae7b9722fec4b5eed2275b5ddc40c59362b7b2add133cfae89f12cc2118da29de08b3cb816b40701c92576d3d9aa_1280.jpg");
        mars.setHasRings(false);
        mars.setMoonCount(2);
        mars.setType("terrestrial");
        mars.setSurfaceGravity(0.38);
        mars.setSurfaceTemperature(210);
        mars.setComposition("Iron oxide, Silicon dioxide");
        planets.add(mars);

// Jupiter
        PlanetResponse jupiter = new PlanetResponse();
        jupiter.setId("jupiter");
        jupiter.setName("Jupiter");
        jupiter.setDescription("The largest planet in our Solar System, a gas giant with a Great Red Spot and over 79 known moons.");
        jupiter.setMass(317.8);
        jupiter.setRadius(11.21);
        jupiter.setSemiMajorAxis(5.2);
        jupiter.setOrbitalPeriod(4333);
        jupiter.setImageUrl("https://pixabay.com/get/g60ff5a007a8bdc55b7972fb414ad2ba0497f9ba81d448360af27e4b90828f23fe2602af97e16296a40ff2c35e285877b10925698389c1b4580e808034e927364_1280.jpg");
        jupiter.setHasRings(true);
        jupiter.setMoonCount(79);
        jupiter.setType("gas giant");
        jupiter.setSurfaceGravity(2.53);
        jupiter.setSurfaceTemperature(165);
        jupiter.setComposition("Hydrogen, Helium");
        planets.add(jupiter);

// Saturn
        PlanetResponse saturn = new PlanetResponse();
        saturn.setId("saturn");
        saturn.setName("Saturn");
        saturn.setDescription("Famous for its spectacular ring system, this gas giant has a low density that would allow it to float in water.");
        saturn.setMass(95.2);
        saturn.setRadius(9.45);
        saturn.setSemiMajorAxis(9.58);
        saturn.setOrbitalPeriod(10759);
        saturn.setImageUrl("https://solarsystem.nasa.gov/system/stellar_items/image_files/38_saturn_1600x900.jpg");
        saturn.setHasRings(true);
        saturn.setMoonCount(82);
        saturn.setType("gas giant");
        saturn.setSurfaceGravity(1.06);
        saturn.setSurfaceTemperature(134);
        saturn.setComposition("Hydrogen, Helium");
        planets.add(saturn);

// Uranus
        PlanetResponse uranus = new PlanetResponse();
        uranus.setId("uranus");
        uranus.setName("Uranus");
        uranus.setDescription("An ice giant that rotates on its side, with a unique tilt of nearly 90 degrees to its orbital plane.");
        uranus.setMass(14.5);
        uranus.setRadius(4.01);
        uranus.setSemiMajorAxis(19.22);
        uranus.setOrbitalPeriod(30687);
        uranus.setImageUrl("https://solarsystem.nasa.gov/system/stellar_items/image_files/69_feature_1600x900_uranus_new.jpg");
        uranus.setHasRings(true);
        uranus.setMoonCount(27);
        uranus.setType("ice giant");
        uranus.setSurfaceGravity(0.89);
        uranus.setSurfaceTemperature(76);
        uranus.setComposition("Hydrogen, Helium, Methane");
        planets.add(uranus);

// Neptune
        PlanetResponse neptune = new PlanetResponse();
        neptune.setId("neptune");
        neptune.setName("Neptune");
        neptune.setDescription("The windiest planet with the strongest measured winds in the Solar System reaching 2,100 km/h.");
        neptune.setMass(17.1);
        neptune.setRadius(3.88);
        neptune.setSemiMajorAxis(30.05);
        neptune.setOrbitalPeriod(60190);
        neptune.setImageUrl("https://pixabay.com/get/g90b4bf4a0cf6c1120257530a739cbe7661d9accaa32bf05eb11f56d97bf10e32b10bd1aaddd6cb8bfaf074aaf396b112_1280.jpg");
        neptune.setHasRings(true);
        neptune.setMoonCount(14);
        neptune.setType("ice giant");
        neptune.setSurfaceGravity(1.14);
        neptune.setSurfaceTemperature(72);
        neptune.setComposition("Hydrogen, Helium, Methane");
        planets.add(neptune);

        return planets;
    }

    public PlanetResponse getPlanetById(String id) {
        return getAllPlanets().stream()
                .filter(planet -> planet.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }
}
